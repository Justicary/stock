import { Router } from "express";
import { crearProducto, getProductos } from "../controllers/producto";

const router = Router();

router.get("/", getProductos);
router.post("/", crearProducto);

export default router;
