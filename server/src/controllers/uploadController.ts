import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import db from "../db";
import { wss } from "../server";
import { WebSocket } from "ws";

const upload = multer({
    storage: multer.memoryStorage(),
});

const initUploadController = async (req: Request, res: Response) => {
    const token = req.body.token;
    const fileName = req.body.fileName;

    if (!token || !fileName) {
        res.status(400).json({
            message: "No token or fileName"
        });
        return;
    }

    const file = await db.file.create({
        data: {
            token,
            name: fileName,
            status: "pending"
        }
    })

    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'upload_complete',
            }));
        }
    });

    res.status(200).json({
        message: "Upload initialized",
        fileId: file.id
    });
}

const uploadController = async (req: Request, res: Response) => {
    await new Promise(resolve => setTimeout(resolve, 10000));
    const fileBuffer = req.file;
    const fileId = req.body.fileId;

    if (!fileBuffer || !fileId) {
        res.status(400).json({
            message: "No file or fileId"
        });
        return;
    }

    const file = await db.file.findUnique({
        where: {
            id: fileId
        }
    })

    if (!file) {
        res.status(404).json({
            message: "File not found"
        });
        return;
    }

    const __dirname = path.resolve();
    const uploadDir = path.join(__dirname, "uploads", file.token);

    try {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${fileId}${path.extname(fileBuffer.originalname)}`;
        const filePath = path.join(uploadDir, fileName);

        // Get image metadata using sharp
        const metadata = await sharp(fileBuffer.buffer).metadata();

        fs.writeFileSync(filePath, fileBuffer.buffer);

        await db.file.update({
            where: {
                id: fileId
            },
            data: {
                status: "uploaded",
                format: metadata.format,
                size: fileBuffer.size,
                width: metadata.width,
                height: metadata.height,
                path: filePath
            }
        })
        
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


export { uploadController, initUploadController, upload };