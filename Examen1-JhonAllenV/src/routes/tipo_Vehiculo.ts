import { Router } from "express";
import { Tipo_VehiculoController } from "../controller/Tipo_VehiculoController";

const routes = Router();

routes.get("", Tipo_VehiculoController.getAll);
routes.get("/:id", Tipo_VehiculoController.getByid);
routes.post("", Tipo_VehiculoController.add);
routes.patch("", Tipo_VehiculoController.update);
routes.delete("/:id", Tipo_VehiculoController.delete);

export default routes;
