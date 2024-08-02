import { Router } from "express";
import { getUsuarios } from "../controllers/usuario";

const router = Router();

router.get("/", getUsuarios);

export default router;
