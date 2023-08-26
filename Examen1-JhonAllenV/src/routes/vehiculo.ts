import { Router } from "express";
import VehiculoController from "../controller/VehiculoController";

const routes = Router();

routes.get("", VehiculoController.getAll);
routes.get("/:id", VehiculoController.getByid);
routes.get("/placa/:placa", VehiculoController.getByPlaque);
routes.post("", VehiculoController.add);
routes.patch("", VehiculoController.update);
routes.delete("/:id", VehiculoController.delete);

export default routes;
