import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Color } from "../entity/Color";

export class ColorController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const ColorRepo = AppDataSource.getRepository(Color);
      const listaColor = await ColorRepo.find({
        where: { estado: true },
      });

      if (listaColor.length == 0) {
        return resp.status(404).json({ mensaje: "no hay vehiculos" });
      }
      return resp.status(200).json({ mensaje: listaColor });
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
      const ColorRepo = AppDataSource.getRepository(Color);
      let color;
      try {
        color = await color.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No hay color con ese ID bro" });
      }
      return resp.status(200).json({ mensaje: color });
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

      const ColorRepo = AppDataSource.getRepository(Color);
      const colo = await ColorRepo.findOne({ where: { id } });

      if (colo) {
        return resp
          .status(404)
          .json({ mensaje: "Ese vehiculo ya existe en la base de datos" });
      }

      let color = new Color();

      color.id = id;
      color.nombre = nombre;
      color.estado = true;

      try {
        await ColorRepo.save(color);
        return resp.status(201).json({ mensaje: "Color de vehiculo Guardado" });
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
    const ColorRepo = AppDataSource.getRepository(Color);
    let colo: Color;

    try {
      colo = await ColorRepo.findOne({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "no existe ese color bro" });
    }

    let color = new Color();

    color.id = id;
    color.nombre = nombre;
    color.estado = true;

    try {
      await ColorRepo.save(color);
      return resp.status(201).json({ mensaje: "color de vehiculo guardado" });
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
      const ColorRepo = AppDataSource.getRepository(Color);
      let colo: Color;
      try {
        colo = await ColorRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({
            mensaje: "no se encuentra un color de vehiculo con ese id bro",
          });
      }

      colo.estado = false;
      try {
        await ColorRepo.save(colo);
        return resp
          .status(200)
          .json({ mensaje: "Se elimino correctamente tu color" });
      } catch (error) {
        return resp
          .status(400)
          .json({ mensaje: "no se elimino correctamente tu color" });
      }
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "no se pudo eliminar el color, algo ha fallado" });
    }
  };
}

export default ColorController;
