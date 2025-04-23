import { Router } from "express";
import { downloadController } from "../controllers/downloadController";

const router = Router();

router.get("/download/:token/:fileId", downloadController);

export default router;