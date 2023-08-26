import { Router } from "express";
import vehiculo from "./vehiculo";
import color from "./color";
import tipo_Vehiculo from "./tipo_Vehiculo";
import marca from "./marca";

const routes = Router();

routes.use("/Vehiculo", vehiculo);
routes.use("/Color", color);
routes.use("/TipoVehiculo", tipo_Vehiculo);
routes.use("/Marca", marca);

export default routes;
