"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_1 = require("../controllers/dashboard");
const router = (0, express_1.Router)();
router.get("/", dashboard_1.getMetricosDashboard);
exports.default = router;
