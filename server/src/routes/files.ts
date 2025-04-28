import { Router } from "express";
import { getFilesController, getFileController, getProcessedFileController } from "../controllers/filesController";

const router = Router();

router.get("/files/:token", getFilesController);
router.get("/file/:token/:fileId", getFileController);
router.get("/processedFile/:token/:fileId", getProcessedFileController);

export default router;