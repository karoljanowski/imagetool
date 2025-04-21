import { Router } from "express";
import processController from "../controllers/processController";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/process/:token/:name", upload.none(), processController);

export default router;