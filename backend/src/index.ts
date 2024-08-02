import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
/* IMPORTACION DE RUTAS */
import rutasDashboard from "./routes/rutasDashboard";
import rutasProducto from "./routes/rutasProducto";
import rutasUsuario from "./routes/rutasUsuario";
import rutasGasto from "./routes/rutasGasto";

/* CONFIGURACIONES */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* RUTAS */
app.use("/dashboard", rutasDashboard); // http://localhost:8000/dashboard
app.use("/productos", rutasProducto); // http://localhost:8000/products
app.use("/usuarios", rutasUsuario); // http://localhost:8000/users
app.use("/gastos", rutasGasto); // http://localhost:8000/expenses

/* SERVIDOR */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`===> Servidor ejecutando en el puerto ${port} <===`);
});
