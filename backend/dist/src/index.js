"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
/* IMPORTACION DE RUTAS */
const rutasDashboard_1 = __importDefault(require("./routes/rutasDashboard"));
const rutasProducto_1 = __importDefault(require("./routes/rutasProducto"));
const rutasUsuario_1 = __importDefault(require("./routes/rutasUsuario"));
const rutasGasto_1 = __importDefault(require("./routes/rutasGasto"));
/* CONFIGURACIONES */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
/* RUTAS */
app.use("/dashboard", rutasDashboard_1.default); // http://localhost:8000/dashboard
app.use("/productos", rutasProducto_1.default); // http://localhost:8000/products
app.use("/usuarios", rutasUsuario_1.default); // http://localhost:8000/users
app.use("/gastos", rutasGasto_1.default); // http://localhost:8000/expenses
/* SERVIDOR */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`===> Servidor ejecutando en el puerto ${port} <===`);
});
