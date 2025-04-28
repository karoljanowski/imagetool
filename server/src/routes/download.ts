import { Router } from "express";
import { downloadAllController } from "../controllers/downloadController";

const router = Router();

router.get("/downloadAll/:token", downloadAllController);

export default router;