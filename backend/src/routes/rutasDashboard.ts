import { Router } from "express";
import { getMetricosDashboard } from "../controllers/dashboard";

const router = Router();

router.get("/", getMetricosDashboard);

export default router;
