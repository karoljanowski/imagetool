import { Request, Response } from "express";
import db from "../db";
import fs from "fs";
import admZip from "adm-zip";
import path from "path";

const downloadAllController = async (req: Request, res: Response) => {
    const { token } = req.params;
    let zipFilePath: string | null = null;

    try {
        if (!token) {
            res.status(400).json({
                success: false,
                message: "Invalid token"
            });
            return;
        }

        const files = await db.file.findMany({
            where: {
                token: token
            }
        });

        if (files.length === 0) {
            res.status(404).json({
                success: false,
                message: "No files found"
            });
            return;
        }

        const __dirname = path.resolve();
        const processedDir = path.join(__dirname, "processed", token);

        if (!fs.existsSync(processedDir)) {
            res.status(404).json({
                success: false,
                message: "No processed images found"
            });
            return;
        }

        const zipFileName = `images_${Date.now()}.zip`;
        zipFilePath = path.join(processedDir, zipFileName);
        
        const zip = new admZip();
        let filesAdded = 0;
        
        for (const file of files) {
            if (file.processedPath && fs.existsSync(file.processedPath)) {
                zip.addLocalFile(file.processedPath, "", file.name + "." + file.processedFormat);
                filesAdded++;
            }
        }
        
        if (filesAdded === 0) {
            res.status(404).json({
                success: false,
                message: "No processed files available for download"
            });
            return;
        }

        zip.writeZip(zipFilePath);
        
        res.download(zipFilePath, (err) => {
            if (zipFilePath && fs.existsSync(zipFilePath)) {
                try {
                    fs.unlinkSync(zipFilePath);
                } catch (unlinkErr) {
                    console.error(`Failed to delete zip file: ${unlinkErr}`);
                }
            }
            
            if (err) {
                console.error(`Error during file download: ${err}`);
            }
        });
    } catch (error) {
        console.error(`Error in downloadAllController: ${error}`);
        
        if (zipFilePath && fs.existsSync(zipFilePath)) {
            try {
                fs.unlinkSync(zipFilePath);
            } catch (unlinkErr) {
                console.error(`Failed to delete zip file after error: ${unlinkErr}`);
            }
        }
        
        res.status(500).json({
            success: false,
            message: "An error occurred while preparing the download"
        });
    }
}

export { downloadAllController };