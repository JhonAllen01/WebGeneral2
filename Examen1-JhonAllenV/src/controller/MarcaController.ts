import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Marca } from "../entity/Marca";

export class MarcaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const MarcaRepo = AppDataSource.getRepository(Marca);
      const listaMarca = await MarcaRepo.find({
        where: { estado: true },
      });

      if (listaMarca.length == 0) {
        return resp.status(404).json({ mensaje: "no hay vehiculos" });
      }
      return resp.status(200).json({ mensaje: listaMarca });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getByid = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp
          .status(404)
          .json({ mensaje: "no se está indicando el ID bro" });
      }
      const MarcaRepo = AppDataSource.getRepository(Marca);
      let marca;
      try {
        marca = await marca.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No hay color con ese ID bro" });
      }
      return resp.status(200).json({ mensaje: marca });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { id, nombre, metalizado, estado } = req.body;

      if (!id) {
        return resp.status(404).json({ mensaje: "debe indicar el id" });
      }
      if (!nombre) {
        return resp
          .status(404)
          .json({ mensaje: "debe indicar el nombre del color" });
      }
      if (!metalizado) {
        return resp
          .status(404)
          .json({ mensaje: "debe indicar el estado del metalizado" });
      }

      const MarcaRepo = AppDataSource.getRepository(Marca);
      const marca = await MarcaRepo.findOne({ where: { id } });

      if (marca) {
        return resp
          .status(404)
          .json({ mensaje: "Esa marca ya existe en la base de datos" });
      }

      let marquita = new Marca();

      marquita.id = id;
      marquita.nombre = nombre;
      marquita.metalizado = metalizado;
      marquita.estado = true;

      try {
        await MarcaRepo.save(marquita);
        return resp.status(201).json({ mensaje: "marca de vehiculo Guardado" });
      } catch (error) {
        return resp.status(400).json({ mensaje: error });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { id, nombre, metalizado, estado } = req.body;

    if (!id) {
      return resp.status(404).json({ mensaje: "debe indicar el id" });
    }
    if (!nombre) {
      return resp.status(404).json({ mensaje: "debe indicar el nombre" });
    }
    if (!metalizado) {
      return resp
        .status(404)
        .json({ mensaje: "debe indicar el estado del metalizado" });
    }
    const MarcaRepo = AppDataSource.getRepository(Marca);
    let marca: Marca;

    try {
      marca = await MarcaRepo.findOne({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "no existe esa marca bro" });
    }

    let marquita = new Marca();

    marquita.id = id;
    marquita.nombre = nombre;
    marquita.metalizado = metalizado;
    marquita.estado = true;

    try {
      await MarcaRepo.save(marquita);
      return resp.status(201).json({ mensaje: "marca de vehiculo guardada" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "debe indicar el id" });
      }
      const MarcaRepo = AppDataSource.getRepository(Marca);
      let marca: Marca;
      try {
        marca = await MarcaRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp.status(404).json({
          mensaje: "no se encuentra una marca de vehiculo con ese id bro",
        });
      }

      marca.estado = false;
      try {
        await MarcaRepo.save(marca);
        return resp
          .status(200)
          .json({ mensaje: "Se elimino correctamente tu marca" });
      } catch (error) {
        return resp
          .status(400)
          .json({ mensaje: "no se elimino correctamente tu marca" });
      }
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "no se pudo eliminar la marca, algo ha fallado" });
    }
  };
}

export default MarcaController;
