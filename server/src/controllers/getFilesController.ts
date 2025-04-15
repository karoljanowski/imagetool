import path from "path";
import fs from "fs";
import { Request, Response } from "express";

const getFilesController = async (req: Request, res: Response) => {
    const token = req.query.token as string;

    if (!token) {
        res.status(400).json({
            message: "No token"
        });
    }

    const __dirname = path.resolve();
    const uploadDir = path.join(__dirname, "uploads", token);

    if (!fs.existsSync(uploadDir)) {
        res.status(404).json({
            message: "No files found"
        });
    }

    const files = fs.readdirSync(uploadDir);

    const filesList = files.map(file => {
        return {
            url: `${process.env.SERVER_URL}/api/file/${token}/${file}`,
            
        }
    })

    res.status(200).json({filesList});
}

const getFileController = async (req: Request, res: Response) => {
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

    try {
        res.sendFile(uploadDir);
    } catch (error) {
        console.error("Error sending file:", error);
        res.status(500).json({
            message: "Error sending file"
        });
        return;
    }
}

export { getFilesController, getFileController };
