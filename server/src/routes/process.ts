import { Router } from "express";
import processController from "../controllers/processController";
import multer from "multer";

const router = Router();
const upload = multer();

router.post("/process", upload.none(), processController);

export default router;