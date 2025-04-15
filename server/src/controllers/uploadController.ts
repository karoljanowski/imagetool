import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const uploadFiles = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

const uploadController = async (req: Request, res: Response) => {
    const file = req.file;
    const token = req.body.token;

    if (!file || !token) {
        res.status(400).json({
            message: "No file or token"
        });
        return;
    }

    const __dirname = path.resolve();
    const uploadDir = path.join(__dirname, "uploads", token);

    try {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(uploadDir, fileName);

        fs.writeFileSync(filePath, file.buffer);

        res.status(200).json({
            message: "File uploaded successfully"
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({
            message: "Error uploading file"
        });
    }

    
}

export { uploadController, uploadFiles };