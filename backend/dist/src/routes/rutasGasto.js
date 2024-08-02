"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gasto_1 = require("../controllers/gasto");
const router = (0, express_1.Router)();
router.get("/", gasto_1.getGastosPorCategoria);
exports.default = router;
