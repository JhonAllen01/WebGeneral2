import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import helmet from "helmet";
import routes from "./routes";
import cors = require("cors");


const PORT = process.env.port || 3000;

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //rutas
    app.use('/', routes);


    // start express server
    app.listen(PORT, () => { console.log(`Servidor corriendo en el puerto: ${PORT}`); });

}).catch(error => console.log(error))
