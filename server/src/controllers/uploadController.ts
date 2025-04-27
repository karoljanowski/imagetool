import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import db from "../db";

const upload = multer({
    storage: multer.memoryStorage(),
});

const uploadController = async (req: Request, res: Response) => {
    try {
        const {token, fileName, format} = req.body;
        const fileBuffer = req.file;

        if (!fileBuffer) {
            res.status(400).json({
                message: "No file provided"
            });
            return;
        }
        
        if (!token || !fileName || !format) {
            res.status(400).json({
                message: "Some required fields are missing"
            });
            return;
        }

        if (!['jpeg', 'png', 'webp', 'avif'].includes(format)) {
            res.status(400).json({
                message: "Invalid format"
            });
            return;
        }

        const fileId = uuidv4();
        const __dirname = path.resolve();
        const uploadDir = path.join(__dirname, "uploads", token);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileId + "." + format);

        const metadata = await sharp(fileBuffer.buffer).metadata();

        fs.writeFileSync(filePath, fileBuffer.buffer);

        await db.file.create({
            data: {
                id: fileId,
                status: "UPLOADED",
                token: token,
                name: fileName,
                originalFormat: format,
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
    } catch (error) {
        console.error('Error in uploadController:', error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export { uploadController, upload };