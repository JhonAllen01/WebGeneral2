import express = require("express");
import { AppDataSource } from "./data-source"
import cors = require("cors");
import helmet from "helmet";
import routes from "./routes";

const port = process.env.port || 3000;

AppDataSource.initialize().then(async () => {

    const app= express();
    app.use (cors());
    app.use (helmet());
    app.use(express.json());
    app.use('/',routes)
    app.listen (port,()=>{console.log( `servidor corriendo en el puerto ${port}` )})

}).catch(error => console.log(error))
