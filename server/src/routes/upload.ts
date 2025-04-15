import express, { Router } from "express";
import { uploadController, uploadFiles } from "../controllers/uploadController";

const router: Router = express.Router();

router.post("/upload", uploadFiles.single("file"), uploadController);

export default router; 