import { Request, Response } from "express";
import sharp from "sharp";
import db from "../db";

const processController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { format, backgroundRemoval, compress, width, height } = req.query;

    if (!id) {
        res.status(400).json({
            message: "Id is required"
        })
        return;
    }

    const file = await db.file.findUnique({
        where: {
            id
        }
    })

    if (!file) {
        res.status(404).json({
            message: "File not found"
        })
        return;
    }

    res.status(200).json({
        message: "Wszystko przeszło"
    })


    
}

export default processController;