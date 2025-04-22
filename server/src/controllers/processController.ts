import { Request, Response } from "express";
import { File as FileType } from "../generated/prisma";
import db from "../db";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { wss } from "../server";
import { WebSocket } from "ws";

const processController = async (req: Request, res: Response) => {
    try {
        const { token, fileId, format, backgroundRemoval, compress, width, height } = req.body;

        const file = await db.file.findUnique({
            where: {
                id: fileId,
                token
            }
        })
        
        if (!file) {
            res.status(404).json({
                message: "File not found"
            })
            return;
        }
        
        const path = `./uploads/${token}/${file.id}.${file.format}`;

        if (!fs.existsSync(path)) {
            res.status(404).json({
                message: "File not found"
            })
            return;
        }

        let imageBuffer = fs.readFileSync(path);
        let sharpInstance = sharp(imageBuffer);
        let compression = {
            quality: 100,
            compressionLevel: 9
        };

        // compress
        if (compress) {
            compression = {
                quality: 80,
                compressionLevel: 6
            }
        }

        // background removal
        if (backgroundRemoval && file.format !== 'jpg') {
            sharpInstance = sharpInstance.removeAlpha().ensureAlpha(0);
        }

        // resize
        if (!Number.isNaN(parseInt(width)) && !Number.isNaN(parseInt(height)) && parseInt(width) > 0 && parseInt(height) > 0) {
            sharpInstance = sharpInstance.resize(parseInt(width), parseInt(height));
        }
        
        // format
        if (format && correctFormats.includes(format)) {
            if (format === 'jpg' || format === 'jpeg') {
                sharpInstance = sharpInstance.jpeg({ quality: compression.quality });
            } else if (format === 'png') {
                sharpInstance = sharpInstance.png({ compressionLevel: compression.compressionLevel });
            } else if (format === 'webp') {
                sharpInstance = sharpInstance.webp({ quality: compression.quality });
            } else if (format === 'avif') {
                sharpInstance = sharpInstance.avif({ quality: compression.quality });
            }
        }

        const outputBuffer = await sharpInstance.toBuffer();
        res.setHeader('Content-Type', `image/${format ?? file.format}`);
        res.status(200).send(outputBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


const correctFormats = ['jpg', 'png', 'webp', 'avif'];

export default processController;