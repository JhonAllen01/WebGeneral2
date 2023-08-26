"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cliente_1 = require("./cliente");
var routes = (0, express_1.Router)();
routes.get('/Clientes', cliente_1.default);
routes.get('/Clientes/:id', cliente_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map