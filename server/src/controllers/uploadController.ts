import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import db from "../db";
import { FileFormat } from "../generated/prisma";
import { sendMessageToAllClients } from "../lib/wss";

const upload = multer({
    storage: multer.memoryStorage(),
});

const initUploadController = async (req: Request, res: Response) => {
    try {
        const token = req.body.token;
        const fileName = req.body.fileName;
        const format = req.body.format;

        if (!token || !fileName) {
            res.status(400).json({
                message: "No token or fileName"
            });
            return;
        }

        if (!['jpeg', 'png', 'webp', 'avif'].includes(format)) {
            res.status(400).json({
                message: "Invalid format"
            });
            return;
        }

        const file = await db.file.create({
            data: {
                token,
                name: fileName,
                status: "UPLOADING",
                originalFormat: format as FileFormat,
            }
        });
        
        sendMessageToAllClients('upload_init', token);
        res.status(200).json({
            message: "Upload initialized",
            fileId: file.id
        });
    } catch (error) {
        console.error('Error in initUploadController:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const uploadController = async (req: Request, res: Response) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const fileBuffer = req.file;
        const fileId = req.body.fileId;

        if (!fileBuffer || !fileId) {
            if (fileId) {
                await saveError(fileId);
            }
            res.status(400).json({
                message: "No file or fileId"
            });
            return;
        }

        const file = await db.file.findUnique({
            where: {
                id: fileId
            }
        });

        if (!file) {
            res.status(404).json({
                message: "File not found"
            });
            return;
        }

        if (file.status === "UPLOADED") {
            res.status(400).json({
                message: "File is already uploaded"
            });
            return;
        }

        const __dirname = path.resolve();
        const uploadDir = path.join(__dirname, "uploads", file.token);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, file.id + "." + file.originalFormat);

        const metadata = await sharp(fileBuffer.buffer).metadata();

        fs.writeFileSync(filePath, fileBuffer.buffer);

        await db.file.update({
            where: {
                id: fileId
            },
            data: {
                status: "UPLOADED",
                originalSize: fileBuffer.size,
                originalWidth: metadata.width,
                originalHeight: metadata.height,
                originalPath: filePath
            }
        });

        res.status(200).json({
            success: true,
            message: "File uploaded successfully"
        });

        sendMessageToAllClients('upload_complete', file.token);
    } catch (error) {
        console.error('Error in uploadController:', error);

        const fileId = req.body.fileId;
        if (fileId) {
            await saveError(fileId);
        }
        
        sendMessageToAllClients('upload_error');

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const saveError = async (fileId: string) => {
    try {
        console.log('Saving error for file', fileId);
        await db.file.update({
            where: {
                id: fileId
            },
            data: {
                status: "ERROR"
            }
        });
    } catch (error) {
        console.error('Error updating file status to ERROR:', error);
    }
}

export { uploadController, initUploadController, upload };