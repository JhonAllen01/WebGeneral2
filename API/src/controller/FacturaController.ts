import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entity/Factura";

export class FacturaController{

    static getAll=async(req:Request,res:Response)=>{
        try {
            const repoFactura=AppDataSource.getRepository(Factura);
            let lista;

            try {
                lista=await repoFactura.find({where:{estado:true},
                    relations:{detallesFactura:{producto:true}, cliente:{persona:true}}});
            } catch (error) {
                return res.status(404).json({message:'No se encontraron facturas'});
            }

            return res.status(200).json(lista);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }

    static getById=async(req:Request,res:Response)=>{
        
    }

    static add=async(req:Request,res:Response)=>{
        
    }

    static update=async(req:Request,res:Response)=>{
        
    }

    static delete=async(req:Request,res:Response)=>{
        
    }
}

export default FacturaController;