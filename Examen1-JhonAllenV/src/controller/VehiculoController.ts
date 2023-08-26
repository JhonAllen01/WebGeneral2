import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";
import { request } from "http";

export class VehiculoController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
      const listaVehiculos = await VehiculoRepo.find({
        where: { estado: true },
      });

      if (listaVehiculos.length == 0) {
        return resp.status(404).json({ mensaje: "no hay vehiculos" });
      }
      return resp.status(200).json({ mensaje: listaVehiculos });
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
      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
      let vehiculo;
      try {
        vehiculo = await VehiculoRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No hay vehiculo con ese ID bro" });
      }
      return resp.status(200).json({ mensaje: vehiculo });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getByPlaque = async (req: Request, resp: Response) => {
    const { placa } = req.params;
    try {
      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
      const vehiculo = await VehiculoRepo.findOne({ where: { placa } });
      if (!vehiculo) {
        return resp.status(404).json({ mensaje: "Vehículo no encontrado" });
      }

      return resp.status(200).json({ mensaje: vehiculo });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const {
        id,
        placa,
        id_marca,
        id_color,
        cilindraje,
        id_tipoVehiculo,
        cantidadPasajeros,
        fechaIngreso,
        estado,
      } = req.body;

      if (!placa) {
        return resp.status(404).json({ mensaje: "debe indicar la placa" });
      }

      if (!cilindraje) {
        return resp.status(404).json({ mensaje: "debe indicar el cilindraje" });
      }

      if (!cantidadPasajeros) {
        return resp
          .status(404)
          .json({ mensaje: "debe indicar la cantidad de pasajeros" });
      }
      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
      const vehi = await VehiculoRepo.findOne({ where: { id } });
      const plaqui = await VehiculoRepo.findOne({ where: { placa } });

      if (vehi) {
        return resp
          .status(404)
          .json({ mensaje: "Ese vehiculo ya existe en la base de datos" });
      }
      if (plaqui) {
        return resp
          .status(404)
          .json({
            mensaje: "Ese vehiculo con esa placa ya existe en la base de datos",
          });
      }

      let vehiculo = new Vehiculo();

      vehiculo.id = id;
      vehiculo.placa = placa;
      vehiculo.id_marca = id_marca;
      vehiculo.id_color = id_color;
      vehiculo.cilindraje = cilindraje;
      vehiculo.cantidadPasajeros = cantidadPasajeros;
      vehiculo.fechaIngreso = fechaIngreso;
      vehiculo.estado = true;

      try {
        await VehiculoRepo.save(vehiculo);
        return resp.status(201).json({ mensaje: "Vehiculo Guardado" });
      } catch (error) {
        return resp.status(400).json({ mensaje: error });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const {
      id,
      placa,
      id_marca,
      id_color,
      cilindraje,
      id_tipoVehiculo,
      cantidadPasajeros,
      fechaIngreso,
      estado,
    } = req.body;

    if (!id) {
      return resp.status(404).json({ mensaje: "debe indicar el id" });
    }
    if (!placa) {
      return resp.status(404).json({ mensaje: "debe indicar la placa" });
    }
    if (!id_marca) {
      return resp.status(404).json({ mensaje: "debe indicar la marca" });
    }
    if (!id_color) {
      return resp.status(404).json({ mensaje: "debe indicar el color" });
    }
    if (!cilindraje) {
      return resp.status(404).json({ mensaje: "debe indicar el cilindraje" });
    }
    if (!id_tipoVehiculo) {
      return resp
        .status(404)
        .json({ mensaje: "debe indicar la tipo de vehiculo" });
    }
    if (!cantidadPasajeros) {
      return resp
        .status(404)
        .json({ mensaje: "debe indicar la cantidad de pasajeros" });
    }
    const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
    let vehi: Vehiculo;

    try {
      vehi = await VehiculoRepo.findOne({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "no existe ese vehiculo" });
    }

    let vehiculo = new Vehiculo();

    vehiculo.id = id;
    vehiculo.placa = placa;
    vehiculo.id_marca = id_marca;
    vehiculo.id_color = id_color;
    vehiculo.cilindraje = cilindraje;
    vehiculo.cantidadPasajeros = cantidadPasajeros;
    vehiculo.fechaIngreso = fechaIngreso;
    vehiculo.estado = true;

    try {
      await VehiculoRepo.save(vehiculo);
      return resp.status(201).json({ mensaje: "Vehiculo Guardado" });
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
      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
      let vehi: Vehiculo;
      try {
        vehi = await VehiculoRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "no se encuentra un vehiculo con ese id bro" });
      }

      vehi.estado = false;
      try {
        await VehiculoRepo.save(vehi);
        return resp
          .status(200)
          .json({ mensaje: "Se elimino correctamente tu vehiculo" });
      } catch (error) {
        return resp
          .status(400)
          .json({ mensaje: "no se elimino correctamente tu vehiculo" });
      }
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "no se pudo eliminar el vehiculo, algo ha fallado" });
    }
  };
}

export default VehiculoController;
