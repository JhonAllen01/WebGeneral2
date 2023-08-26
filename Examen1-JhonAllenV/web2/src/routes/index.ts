import { Router } from "express";
import cliente from "./cliente";
const routes = Router();
routes.use('/Cliente',cliente);
routes.use('/Cliente/:id',cliente);

export default routes;

