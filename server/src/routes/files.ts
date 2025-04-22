import { Router } from "express";
import { getFilesController, getFileController } from "../controllers/filesController";

const router = Router();

router.get("/files/:token", getFilesController);
router.get("/file/:token/:name", getFileController);

export default router;