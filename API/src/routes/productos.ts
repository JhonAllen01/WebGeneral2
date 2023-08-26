//rutas principales y para cada ruta se asignan sus subrutas

import { Router } from "express";
import ProductosController from "../controller/ProductosController";
import { checkjwt } from "../middleware/jwt";
import { checkRoles } from "../middleware/roles";

const routes = Router();

//los : significan que le envio un parametro
//patch jalar datos y caerle encima a la bd con los nuevos
//put borrar y poner uno nuevo
//patch y put se pueden utilizar iguales

routes.get("", /*checkjwt,checkRoles(['admin']),*/ ProductosController.getAll);
routes.get("/:id", ProductosController.getById);
routes.post("", ProductosController.add);
routes.patch("", ProductosController.update);
routes.delete("/:id", ProductosController.delete);

export default routes;
