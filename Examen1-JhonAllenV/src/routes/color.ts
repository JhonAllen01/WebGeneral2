import { Router } from "express";
import { ColorController } from "../controller/ColorController";

const routes = Router();

routes.get("", ColorController.getAll);
routes.get("/:id", ColorController.getByid);
routes.post("", ColorController.add);
routes.patch("", ColorController.update);
routes.delete("/:id", ColorController.delete);

export default routes;
