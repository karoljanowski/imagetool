import { Router } from "express";
import { getFilesController, getFileController } from "../controllers/filesController";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/files", upload.none(), getFilesController);
router.get("/file/:token/:name", getFileController);

export default router;