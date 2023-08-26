import { Router } from "express";
import ClienteController from "../controller/ClienteController";

const routes = Router();
routes.get('/',ClienteController.getAll)
routes.get('/:id',ClienteController.getById)
export default routes;




