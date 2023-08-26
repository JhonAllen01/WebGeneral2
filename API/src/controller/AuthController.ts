import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import * as jwt from "jsonwebtoken"


class AuthController{
    
    static login=async(req:Request,res:Response)=>{
        try {
            const{correo,contrasena}=req.body;

            if(!correo || !contrasena){
                return res.status(400).json({mensaje:'Usuario o contrasena incorrecta'});
            }

            const repoUsuario=AppDataSource.getRepository(Usuario);
            let usuario:Usuario;

            try {
                usuario=await repoUsuario.findOneOrFail({where:{correo}});
            } catch (error) {
                return res.status(400).json({mensaje:'No encontrado'});
            }

            if(!usuario.checkPassword(contrasena)){
                return res.status(400).json({mensaje:'Contrasena no encontrada'});
            }

            const token=jwt.sign({id: usuario.id}, "utnKey1234", {expiresIn: "5m"});

            return res.status(200).json({
                token,
                rol:usuario.rol,
                id:usuario.id
            })

        } catch (error) {
            return res.status(400).json({mensaje:error});
        }
    }
}

export default AuthController;