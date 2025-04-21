'use client'
import getFiles from "@/lib/files";
import { useEffect, useState } from "react";
import Manager from "./Manager/Manager";
import { File, NewFilesSettings } from "@/lib/types/file";
import FileItem from "./FileItem";
import { Button } from "../ui/button";
import deleteAllFiles from "@/lib/delete";


const FilesList = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [newFilesSettings, setNewFilesSettings] = useState<NewFilesSettings[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const fetchFiles = async () => {
        const data = await getFiles();
        setFiles(data.filesList);
    }

    const handleSelectButton = () => {
        if (selectedFiles.length === files.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(files);
        }
    }

    const handleDeleteAll = async () => {
        await deleteAllFiles();
        fetchFiles();
    }

    useEffect(() => {
        fetchFiles();

        const ws = new WebSocket(`ws://localhost:3001`);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'upload_complete' || data.type === 'upload_init') {
                fetchFiles();
            }
        }
    }, []);

    useEffect(() => {
        files.forEach((file) => {
            if (file.status === 'uploaded') {
                setNewFilesSettings((prev) => [...prev, { 
                    fileId: file.id, 
                    newFormat: file.originalFormat || '', 
                    newWidth: file.originalWidth || 0, 
                    newHeight: file.originalHeight || 0, 
                    removeBackground: false, 
                    compress: false 
                }]);
            }
        });
    }, [files]);

    return (
        <>
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Your uploads</h1>
                    <p className="text text-neutral-400 mb-4">Select image and chose what you want to do with it</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleSelectButton}>
                        {selectedFiles.length === files.length ? 'Deselect all' : 'Select all'}
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteAll}>
                        Delete all
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {files && files.map((file) => (
                    <FileItem key={file.id} file={file} newFilesSettings={newFilesSettings} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                ))}
            </div>
        </div>
        <Manager selectedFiles={selectedFiles} setNewFilesSettings={setNewFilesSettings} newFilesSettings={newFilesSettings} />
        </>
    )
}



export default FilesList;