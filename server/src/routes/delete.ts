import { Router } from "express";
import { deleteAllFilesController, deleteFileController } from "../controllers/deleteController";

const router = Router();

router.delete("/deleteAll/:token", deleteAllFilesController);
router.delete("/delete/:token/:fileId", deleteFileController);

export default router;