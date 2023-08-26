//rutas principales y para cada ruta se asignan sus subrutas

import { Router } from "express";
import producto from "./productos";
import usuario from "./usuario";
import auth from "./auth";
import factura from "./factura";
import categorias from "./categorias";

const routes = Router();

routes.use("/Productos", producto);
routes.use("/Usuarios", usuario);
routes.use("/Auth", auth);
routes.use("/Facturas", factura);
routes.use("/Categorias", categorias);


export default routes;
