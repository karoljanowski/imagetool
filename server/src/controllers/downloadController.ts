import { Request, Response } from "express";
import db from "../db";
import fs from "fs";

const downloadController = async (req: Request, res: Response) => {
    const { token, fileId } = req.params;

    if (!token || !fileId) {
        res.status(400).json({
            message: "Invalid token or fileId"
        });
        return;
    }

    const file = await db.file.findUnique({
        where: {
            id: fileId,
            token: token
        }
    });

    if (!file || !file.processedPath || !fs.existsSync(file.processedPath)) {
        res.status(404).json({
            message: "File not found"
        });
        return;
    }

    res.download(file.processedPath, file.name + "." + file.processedFormat);
}

export { downloadController };