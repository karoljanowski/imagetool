import { Request, Response } from "express";
import { File as FileType, FileFormat, FileStatus } from "../generated/prisma";
import db from "../db";
import fs from "fs";
import sharp from "sharp";
import path from "path";

const processController = async (req: Request, res: Response) => {
    try {
        const { token, fileId, newFormat, removeBackground, compress, newWidth, newHeight } = req.body;

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

        if (!file.originalPath) {
            res.status(404).json({
                message: "File not found"
            })
            return;
        }

        const outputBuffer = await processFile(res, file, file.originalPath, newFormat, removeBackground, compress, newWidth, newHeight);

        if (!outputBuffer) {
            res.status(400).json({
                message: "Invalid output buffer"
            })
            return;
        }

        await saveFile(file, outputBuffer, newFormat, newWidth, newHeight, removeBackground, compress);

        res.status(200).json({
            message: "File processed successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const processFile = async (res: Response, file: FileType, originalPath: string, newFormat: FileFormat, removeBackground: boolean, compress: boolean, newWidth?: string, newHeight?: string) => {
    let imageBuffer = fs.readFileSync(originalPath);
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
    if (removeBackground && file.originalFormat !== 'jpeg') {
        sharpInstance = sharpInstance.removeAlpha().ensureAlpha(0);
    }

    // resize
    if (newWidth && newHeight) {
        const width = parseInt(newWidth);
        const height = parseInt(newHeight);
        if (Number.isInteger(width) && Number.isInteger(height) && width > 0 && height > 0) {
            sharpInstance = sharpInstance.resize(width, height);
        } else {
            res.status(400).json({
                message: "Invalid width or height"
            })
            return;
        }
    }
    
    // format
    if (newFormat) {
        if (newFormat === 'jpeg') {
            sharpInstance = sharpInstance.jpeg({ quality: compression.quality });
        } else if (newFormat === 'png') {
            sharpInstance = sharpInstance.png({ compressionLevel: compression.compressionLevel });
        } else if (newFormat === 'webp') {
            sharpInstance = sharpInstance.webp({ quality: compression.quality });
        } else if (newFormat === 'avif') {
            sharpInstance = sharpInstance.avif({ quality: compression.quality });
        } else {
            res.status(400).json({
                message: "Invalid format"
            })
            return;
        }
    }

    return sharpInstance.toBuffer();
}

const saveFile = async (file: FileType, buffer: Buffer, format: FileFormat, newWidth?: string, newHeight?: string, removeBackground?: string, compress?: string) => {
    const __dirname = path.resolve();
    const processedDir = path.join(__dirname, "processed", file.token);

    if (!fs.existsSync(processedDir)) {
        fs.mkdirSync(processedDir, { recursive: true });
    }

    const fileName = `${file.id}.${format ?? file.originalFormat}`;
    const filePath = path.join(processedDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // update database
    const updateData: {
        status: FileStatus;
        processedFormat?: FileFormat;
        processedWidth?: number;
        processedHeight?: number;
        processedPath?: string;
        processedSize?: number;
        processedRemovedBackground?: boolean;
        processedCompressed?: boolean;
    } = {
        status: 'PROCESSED'
    };

    // update format
    if (format) {
        updateData.processedFormat = format as FileFormat;
    } else {
        updateData.processedFormat = file.originalFormat as FileFormat;
    }

    // update width
    if (newWidth) {
        updateData.processedWidth = parseInt(newWidth);
    } else if (file.originalWidth) {
        updateData.processedWidth = file.originalWidth;
    }

    // update height
    if (newHeight) {
        updateData.processedHeight = parseInt(newHeight);
    } else if (file.originalHeight) {
        updateData.processedHeight = file.originalHeight;
    }

    // update removed background
    if (removeBackground === 'true') {
        updateData.processedRemovedBackground = true;
    } else {
        updateData.processedRemovedBackground = false;
    }

    // update compressed
    if (compress === 'true') {
        updateData.processedCompressed = true;
    } else {
        updateData.processedCompressed = false;
    }

    // update path
    updateData.processedPath = filePath;

    // update size
    updateData.processedSize = buffer.length;

    await db.file.update({
        where: {
            id: file.id
        },
        data: updateData
    })
}

export default processController;