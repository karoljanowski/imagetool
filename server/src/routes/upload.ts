import express, { Router } from "express";
import { uploadController, upload, initUploadController } from "../controllers/uploadController";

const router: Router = express.Router();

router.post("/upload", upload.single("file"), uploadController);
router.post("/init-upload", upload.none(), initUploadController);

export default router; 