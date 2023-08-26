"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Cliente_1 = require("./entity/Cliente");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "laboratorio1",
    synchronize: true,
    logging: false,
    entities: [Cliente_1.Cliente],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map