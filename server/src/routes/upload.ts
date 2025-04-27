import express, { Router } from "express";
import { uploadController, upload } from "../controllers/uploadController";

const router: Router = express.Router();

router.post("/upload", upload.single("file"), uploadController);

export default router; 