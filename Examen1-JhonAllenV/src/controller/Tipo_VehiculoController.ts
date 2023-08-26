import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";

export class Tipo_VehiculoController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const TipoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      const listaTipo = await TipoRepo.find({
        where: { estado: true },
      });

      if (listaTipo.length == 0) {
        return resp.status(404).json({ mensaje: "no hay vehiculos" });
      }
      return resp.status(200).json({ mensaje: listaTipo });
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
      const TipoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      let tipo;
      try {
        tipo = await tipo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No hay color con ese ID bro" });
      }
      return resp.status(200).json({ mensaje: tipo });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { id, nombre, estado } = req.body;

      if (!id) {
        return resp.status(404).json({ mensaje: "debe indicar el id" });
      }
      if (!nombre) {
        return resp
          .status(404)
          .json({ mensaje: "debe indicar el nombre del color" });
      }

      const tipoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      const tipo = await tipoRepo.findOne({ where: { id } });

      if (tipo) {
        return resp
          .status(404)
          .json({ mensaje: "Ese vehiculo ya existe en la base de datos" });
      }

      let tipoVehiculo = new Tipo_Vehiculo();

      tipoVehiculo.id = id;
      tipoVehiculo.nombre = nombre;
      tipoVehiculo.estado = true;

      try {
        await tipoRepo.save(tipo);
        return resp.status(201).json({ mensaje: "tipo de vehiculo Guardado" });
      } catch (error) {
        return resp.status(400).json({ mensaje: error });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { id, nombre, estado } = req.body;

    if (!id) {
      return resp.status(404).json({ mensaje: "debe indicar el id" });
    }
    if (!nombre) {
      return resp.status(404).json({ mensaje: "debe indicar el nombre" });
    }
    const TipoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
    let tipo: Tipo_Vehiculo;

    try {
      tipo = await TipoRepo.findOne({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "no existe ese tipo bro" });
    }

    let tipoVehiculo = new Tipo_Vehiculo();

    tipoVehiculo.id = id;
    tipoVehiculo.nombre = nombre;
    tipoVehiculo.estado = true;

    try {
      await TipoRepo.save(tipo);
      return resp.status(201).json({ mensaje: "tipo de vehiculo guardado" });
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
      const TipoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      let tipo: Tipo_Vehiculo;
      try {
        tipo = await TipoRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp.status(404).json({
          mensaje: "no se encuentra un color de vehiculo con ese id bro",
        });
      }

      tipo.estado = false;
      try {
        await TipoRepo.save(tipo);
        return resp
          .status(200)
          .json({ mensaje: "Se elimino correctamente tu tipo de vehiculo" });
      } catch (error) {
        return resp
          .status(400)
          .json({ mensaje: "no se elimino correctamente tu tipo de vehiculo" });
      }
    } catch (error) {
      return resp
        .status(400)
        .json({
          mensaje: "no se pudo eliminar el tipo de vehiculo, algo ha fallado",
        });
    }
  };
}

export default Tipo_VehiculoController;
