import { Router } from "express";
import { getGastosPorCategoria } from "../controllers/gasto";

const router = Router();

router.get("/", getGastosPorCategoria);

export default router;
