import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";


export class UsuarioController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const userRepo = AppDataSource.getRepository(Usuario);
            const userList = await userRepo.find({ where: { estado: true } });

            if (userList.length == 0) {
                return res.status(404).json({ mensaje: 'No hay usuarios' });
            }

            return res.status(200).json(userList);
        } catch (error) {
            return res.status(400).json({ mensaje: error });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);

            if (!id) {
                return res.status(404).json({ mensaje: 'Usuario inexistente' });
            }

            const userRepo = AppDataSource.getRepository(Usuario);
            let userList;

            try {
                userList = await userRepo.findOneOrFail({ where: { id: id, estado: true } });
            } catch (error) {
                return res.status(404).json({ mensaje: 'No encontrado' });
            }

            return res.status(200).json(userList);
        } catch (error) {
            return res.status(400).json({ mensaje: error });
        }
    }

    static add = async (req: Request, res: Response) => {
        try {
            const { id, nombre, apellido1, apellido2, correo, contrasena, rol, estado } = req.body;

            if (!id || !nombre || !apellido1 || !apellido2 || !correo
                || !contrasena || !rol) {
                return res.status(404).json({ mensaje: 'Ingrese un valor valido' });
            }

            const userRepo = AppDataSource.getRepository(Usuario);

            let buscar = await userRepo.findOne({ where: { id: id } });
            if (buscar) {
                return res.status(404).json({ mensaje: 'Usuario existente' });
            }

            buscar = await userRepo.findOne({ where: { correo: correo } });
            if (buscar) {
                return res.status(404).json({ mensaje: 'Correo existente' });
            }

            //let fecha:new Date();
            let userList = new Usuario;

            userList.id = id;
            userList.nombre = nombre;
            userList.apellido1 = apellido1;
            userList.apellido2 = apellido2;
            //userList.fecha_ingreso=fecha;
            userList.correo = correo;
            userList.contrasena = contrasena;
            userList.rol = rol;
            userList.estado = true;

            //llamo el metodo de encriptar
            userList.hashPassword();

            try {
                await userRepo.save(userList);
                return res.status(201).json({ mensaje: 'Usuario insertado' });
            } catch (error) {
                return res.status(400).json({ mensaje: error });
            }

        } catch (error) {
            return res.status(400).json({ mensaje: error });
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const { id, nombre, apellido1, apellido2, correo, contrasena, rol } = req.body;

            /*if (!id || !nombre || !apellido1 || !apellido2 || !correo
                || !contrasena || !rol) {
                return res.status(404).json({ mensaje: 'Ingrese valores validos' });
            }*/

            const userRepo = AppDataSource.getRepository(Usuario);
            let userList;

            try {
                userList = await userRepo.findOneOrFail({ where: { id } })
            } catch (error) {
                return res.status(404).json({ mensaje: 'Usuario inexistente' });
            }

            let user: Usuario;
            user.nombre = nombre;
            user.apellido1 = apellido1;
            user.apellido2 = apellido2;
            user.correo = correo;
            user.contrasena = contrasena;
            user.rol = rol;
            user.estado = true;

            user.hashPassword();

            try {
                await userRepo.save(user);
                return res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
            } catch (error) {
                return res.status(404).json({ mensaje: 'No se pudo actualizar' });
            }

        } catch (error) {
            return res.status(400).json({ mensaje: error });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);

            if (!id) {
                return res.status(404).json({ mensaje: 'Ingrese un id valido' });
            }

            const userRepo = AppDataSource.getRepository(Usuario);
            let userList: Usuario;

            try {
                userList = await userRepo.findOneOrFail({ where: { id: id, estado: true } });
            } catch (error) {
                return res.status(404).json({ mensaje: 'Usuario inexistente' });
            }

            userList.estado = false;

            try {
                userRepo.save(userList);
                return res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
            } catch (error) {
                return res.status(404).json({ mensaje: 'No se pudo eliminar el usuario' });
            }

        } catch (error) {
            return res.status(400).json({ mensaje: error });
        }
    }
}

export default UsuarioController;
