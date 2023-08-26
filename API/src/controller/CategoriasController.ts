import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CategoriaProducto } from "../entity/CategoriaProducto";

export class CategoriasController {

    static getAll = async (req: Request, resp: Response) => {
        try {
            const categoriasRepo = AppDataSource.getRepository(CategoriaProducto);
            const listaCategorias = await categoriasRepo.find({
                where: { estado: true }
            });

            if (listaCategorias.length == 0) {
                return resp.status(404).json({ mensaje: "No se encontraron resultados" });
            }

            return resp.status(200).json(listaCategorias);
        } catch (error) {
            return resp.status(400).json({ error: error });
        }
    };
}

export default CategoriasController;
