'use client'
import getFiles from "@/lib/files";
import { useEffect, useState } from "react";
import Image from "next/image";

const FilesList = () => {
    const [files, setFiles] = useState<{url: string}[]>([]);

    const fetchFiles = async () => {
        const data = await getFiles();
        setFiles(data.filesList);
    }

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:3001`);
        ws.onopen = () => {
            console.log('connected to server');
        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'upload_complete') {
                console.log('upload_complete');
                fetchFiles();
            }
        }
        fetchFiles();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Files</h1>
            <div className="flex flex-wrap gap-4">
                {files && files.map((file) => (
                    <div key={file.url}>
                        <Image src={file.url} alt={file.url} width={100} height={100} className="rounded-md object-cover w-[100px] h-[100px]" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilesList;