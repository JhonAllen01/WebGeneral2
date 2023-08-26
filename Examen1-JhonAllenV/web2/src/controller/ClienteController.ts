import { Request, Response } from "express";

export class ClienteController{

    static getAll= async(req:Request,res:Response)=>{
        return res.status(200).json({mensaje:"Soy el profe"})
    }
    
    static getById= async(req:Request,res:Response)=>{
        return res.status(200).json({mensaje:"Soy el estudiante"})
    }
    
}

export default ClienteController;

