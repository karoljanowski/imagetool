import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import db from "../db";

const getFilesController = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;

        if (!token) {
            res.status(400).json({
                success: false,
                message: "No token"
            });
            return;
        }

        const files = await db.file.findMany({
            where: {
                token
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        const filesList = files.map(file => {
            return {
                id: file.id,
                token: file.token,
                url: `${process.env.SERVER_URL}/api/file/${token}/${file.id}.${file.originalFormat}`,
                status: file.status,
                name: file.name,
                size: file.originalSize,
                originalFormat: file.originalFormat,
                originalWidth: file.originalWidth,
                originalHeight: file.originalHeight,
                processedFormat: file.processedFormat,
                processedWidth: file.processedWidth,
                processedHeight: file.processedHeight,
                processedRemovedBackground: file.processedRemovedBackground,
                processedCompressed: file.processedCompressed,
                processedPath: file.processedPath,
                processedSize: file.processedSize
            }
        });

        res.status(200).json({
            success: true,
            filesList
        });
    } catch (error) {
        console.error('Error in getFilesController:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getFileController = async (req: Request, res: Response) => {
    getFile({ req, res, dir: 'uploads' });
}
const getProcessedFileController = async (req: Request, res: Response) => {
    getFile({ req, res, dir: 'processed' });
}

interface GetFileParams {
    req: Request;
    res: Response;
    dir: 'uploads' | 'processed';
}

const getFile = async ({ req, res, dir }: GetFileParams) => {
    try {
        const token = req.params.token;
        const fileId = req.params.fileId;

        const __dirname = path.resolve();
        const uploadDir = path.join(__dirname, dir, token, fileId);

        if (!fs.existsSync(uploadDir)) {
            res.status(404).json({
                success: false,
                message: "File not found"
            });
            return;
        }

        res.sendFile(uploadDir);
    } catch (error) {
        console.error("Error in getFileController:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export { getFilesController, getFileController, getProcessedFileController };
