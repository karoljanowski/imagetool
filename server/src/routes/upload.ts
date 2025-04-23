import express, { Router } from "express";
import { uploadController, upload, initUploadController } from "../controllers/uploadController";

const router: Router = express.Router();

router.post("/init-upload", upload.none(), initUploadController);
router.post("/upload", upload.single("file"), uploadController);

export default router; 