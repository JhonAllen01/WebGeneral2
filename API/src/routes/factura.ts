import { Router } from "express";
import FacturaController from "../controller/FacturaController";


const routes=Router();

routes.get('/',FacturaController.getAll);
routes.get('/:id',FacturaController.getById);
routes.post('/',FacturaController.add);
routes.patch('/',FacturaController.update);
routes.delete('/:id',FacturaController.delete);

export default routes;