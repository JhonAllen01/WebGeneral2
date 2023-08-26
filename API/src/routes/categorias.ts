import { Router } from "express";
import CategoriasController from "../controller/categoriasController";

const routes = Router();

routes.get('/', CategoriasController.getAll);

export default routes;