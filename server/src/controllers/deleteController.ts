import db from "../db";
import { Request, Response } from "express";
import fs from "fs";

const deleteAllFilesController = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        const path = `./uploads/${token}`;

        fs.rmSync(path, { recursive: true, force: true });
        await db.file.deleteMany({
            where: {
                token: token
            }
        });

        res.status(200).json({
            success: true,
            message: "Files deleted"
        });
    } catch (error) {
        console.error('Error in deleteAllFilesController:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const deleteFileController = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        const fileId = req.params.fileId;
        
        const file = await db.file.findUnique({
            where: {
                id: fileId,
                token: token
            }
        });
        
        if (!file || !file.originalPath) {
            res.status(404).json({
                success: false,
                message: "File not found"
            });
            return;
        }

        fs.unlinkSync(file.originalPath);
        await db.file.delete({
            where: {
                id: fileId
            }
        });

        res.status(200).json({
            success: true,
            message: "File deleted"
        });
    } catch (error) {
        console.error('Error in deleteFileController:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export { deleteAllFilesController, deleteFileController };