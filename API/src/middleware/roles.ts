import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";


export const checkRoles=(roles:Array<string>)=>{

    return async(req:Request,res:Response,next:NextFunction)=>{

        const {id}=res.locals.payload;
        const userRepo=AppDataSource.getRepository(Usuario);
        let usuario;

        try {
            usuario=await userRepo.findOneOrFail({where:{id:id}});
        } catch (error) {
            return res.status(400).json({mensaje:'Error en roles'});
        }

        if(roles.includes(usuario.rol)){
            return res.status(403).json('Acceso no autorizado');
        }

        next();
    }
}