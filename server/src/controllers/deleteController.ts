import db from "../db";
import { Request, Response } from "express";
import fs from "fs";

const deleteAllFilesController = async (req: Request, res: Response) => {
    const token = req.params.token;
    console.log(token);
    const path = `./uploads/${token}`;

    if (!fs.existsSync(path)) {
        res.status(404).json({
            message: "Files not found"
        })
        return;
    }

    fs.rmSync(path, { recursive: true, force: true });
    await db.file.deleteMany({
        where: {
            token: token
        }
    })

    res.status(200).json({
        message: "Files deleted"
    })
}

const deleteFileController = async (req: Request, res: Response) => {
    const token = req.params.token;
    const fileId = req.params.fileId;
    
    const file = await db.file.findUnique({
        where: {
            id: fileId
        }
    })
    
    if (!file || !file.path) {
        res.status(404).json({
            message: "File not found"
        })
        return;
    }

    fs.unlinkSync(file.path);
    await db.file.delete({
        where: {
            id: fileId
        }
    })

    res.status(200).json({
        message: "File deleted"
    })
}

export { deleteAllFilesController, deleteFileController };