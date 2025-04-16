'use client'
import getFiles from "@/lib/files";
import { useEffect, useState } from "react";
import Manager from "./Manager/Manager";
import { File } from "@/lib/types/file";
import FileItem from "./FileItem";

const FilesList = () => {
    const [files, setFiles] = useState<File[]>([]);

    const fetchFiles = async () => {
        console.log('fetching files');
        const data = await getFiles();
        setFiles(data.filesList);
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

    return (
        <>
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Files</h1>
            <div className="flex flex-wrap gap-4">
                {files && files.map((file) => (
                    <FileItem key={file.id} file={file} />
                ))}
            </div>
        </div>
        <Manager />
        </>
    )
}



export default FilesList;