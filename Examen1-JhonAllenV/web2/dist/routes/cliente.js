"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ClienteController_1 = require("../controller/ClienteController");
var routes = (0, express_1.Router)();
routes.get('/', ClienteController_1.default.getAll);
//routes.get('/:id',ClienteController.getById)
exports.default = routes;
//# sourceMappingURL=cliente.js.map