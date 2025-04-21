import { Router } from "express";
import { deleteAllFilesController, deleteFileController } from "../controllers/deleteController";
import multer from "multer";

const router = Router();
const upload = multer();

router.delete("/deleteAll/:token", upload.none(), deleteAllFilesController);
router.delete("/delete/:token", upload.none(), deleteFileController);

export default router;