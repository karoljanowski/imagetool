import { Request, Response } from "express";
import { File as FileType, FileFormat } from "../generated/prisma";
import db from "../db";
import fs from "fs";
import sharp from "sharp";
import path from "path";
// HERE WHOLE CODE TO REWRITE

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
        
        const currentFilePath = `./uploads/${token}/${file.id}.${file.format}`;

        if (!fs.existsSync(currentFilePath)) {
            res.status(404).json({
                message: "File not found"
            })
            return;
        }

        const outputBuffer = await processFile(res, file, format, backgroundRemoval, compress, currentFilePath, width, height);

        if (!outputBuffer) {
            res.status(400).json({
                message: "Invalid output buffer"
            })
            return;
        }

        await saveFile(file, currentFilePath, outputBuffer, format, width, height);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const processFile = async (res: Response, file: FileType, format: FileFormat, backgroundRemoval: boolean, compress: boolean, currentFilePath: string, width?: string, height?: string) => {
    let imageBuffer = fs.readFileSync(currentFilePath);
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
    if (width && height) {
        if (!Number.isNaN(parseInt(width)) && !Number.isNaN(parseInt(height)) && parseInt(width) > 0 && parseInt(height) > 0) {
            sharpInstance = sharpInstance.resize(parseInt(width), parseInt(height));
        } else {
            res.status(400).json({
                message: "Invalid width or height"
            })
            return;
        }
    }
    
    // format
    if (format && ['jpg', 'png', 'webp', 'avif'].includes(format)) {
        if (format === 'jpg') {
            sharpInstance = sharpInstance.jpeg({ quality: compression.quality });
        } else if (format === 'png') {
            sharpInstance = sharpInstance.png({ compressionLevel: compression.compressionLevel });
        } else if (format === 'webp') {
            sharpInstance = sharpInstance.webp({ quality: compression.quality });
        } else if (format === 'avif') {
            sharpInstance = sharpInstance.avif({ quality: compression.quality });
        }
    }

    return sharpInstance.toBuffer();
}

const saveFile = async (file: FileType, currentFilePath: string, buffer: Buffer, format: FileFormat, width?: number, height?: number) => {
    const __dirname = path.resolve();
    const processedDir = path.join(__dirname, "processed", file.token);

    if (!fs.existsSync(processedDir)) {
        fs.mkdirSync(processedDir, { recursive: true });
    }

    const fileName = `${file.id}${file.name}.${format ?? file.format}`;
    const filePath = path.join(processedDir, fileName);

    fs.writeFileSync(filePath, buffer);

    await db.file.update({
        where: {
            id: file.id
        },
        data: {
            processedPath: filePath,
            processedWidth: width ?? file.width,
            processedHeight: height ?? file.height,
            processedFormat: format ?? file.format,
            processedSize: buffer.length
        }
    })
}

export default processController;