import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import db from "../db";

const getFilesController = async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;

        if (!token) {
            res.status(400).json({
                message: "No token"
            });
            return;
        }

        const files = await db.file.findMany({
            where: {
                token
            }
        });

        const filesList = files.map(file => {
            return {
                id: file.id,
                url: `${process.env.SERVER_URL}/api/file/${token}/${file.id}.${file.format}`,
                status: file.status,
                name: file.name,
                size: file.size,
                originalFormat: file.format,
                originalWidth: file.width,
                originalHeight: file.height,
            }
        });

        res.status(200).json({filesList});
    } catch (error) {
        console.error('Error in getFilesController:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getFileController = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        const name = req.params.name;

        const __dirname = path.resolve();
        const uploadDir = path.join(__dirname, "uploads", token, name);

        if (!fs.existsSync(uploadDir)) {
            res.status(404).json({
                message: "File not found"
            });
            return;
        }

        res.sendFile(uploadDir);
    } catch (error) {
        console.error("Error in getFileController:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export { getFilesController, getFileController };
