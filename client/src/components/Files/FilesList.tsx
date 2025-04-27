'use client'
import getFiles from "@/lib/files";
import { useEffect, useState, useRef } from "react";
import Manager from "./Manager/Manager";
import { File } from "@/lib/types/file";
import FileItem from "./FileItem";
import { Button } from "../ui/button";
import { deleteAllFiles } from "@/lib/delete";
import { toast } from "sonner";
import getToken from "@/lib/token";
import { useFiles } from "@/lib/context/FileContext";
import DropButton from "../DropButton";

const FilesList = () => {
    const { files, selectedFilesIds, setSelectedFilesIds, fetchFiles } = useFiles();
    const [isDeletingAll, setIsDeletingAll] = useState(false);
    const managerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const calculateFilesListHeight = () => {
        const listFromTop = listRef.current?.offsetTop;
        const managerHeight = managerRef.current?.offsetHeight;
        const height = `calc(100svh - ${listFromTop}px - ${managerHeight}px - 10px)`;
        return height;
    }

    const handleSelectButton = () => {
        if (selectedFilesIds.length === files.length) {
            setSelectedFilesIds([]);
        } else {
            setSelectedFilesIds(files.map((file) => file.id));
        }
    }

    const handleDeleteAll = async () => {
        setIsDeletingAll(true);
        const data = await deleteAllFiles();
        if (data.success) {
            toast.success(data.message);
            fetchFiles();
        } else {
            toast.error(data.message);
        }
        setIsDeletingAll(false);
    }

    useEffect(() => {
        fetchFiles();

        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const token = getToken();
            if (data.token !== token) return;

            if (data.type === 'upload_complete' || 
                data.type === 'upload_init' || 
                data.type === 'upload_error' ||
                data.type === 'process_complete' ||
                data.type === 'process_error' ||
                data.type === 'process_started') {
                fetchFiles();
            }
            if (data.type === 'upload_error') {
                toast.error('Failed to upload file');
            }

            if (data.type === 'upload_complete') {
                toast.success('File uploaded successfully');
            }

            if (data.type === 'process_started') {
                toast.info('Processing started');
            }

            if (data.type === 'process_complete') {
                toast.success('File processed successfully');
            }

            if (data.type === 'process_error') {
                toast.error('Failed to process file');
            }
        }
    }, []);

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="flex justify-between md:items-center flex-col md:flex-row">
                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-bold">Your uploads</h1>
                        <p className="text-xs md:text-sm text-neutral-400 mb-4">Select image and chose what you want to do with it</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSelectButton} size="sm">
                            {selectedFilesIds.length === files.length ? 'Deselect all' : 'Select all'}
                        </Button>
                        <DropButton size="sm" variant="primary" text="Upload" />
                        <Button variant="destructive" onClick={handleDeleteAll} disabled={isDeletingAll} size="sm">
                            {isDeletingAll ? 'Deleting...' : 'Delete all'}
                        </Button>
                    </div>
                </div>
                <div ref={listRef} className="overflow-y-auto relative mask-scroll-container" 
                    style={{ height: calculateFilesListHeight() }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
                        {files && files.map((file) => (
                            <FileItem key={file.id} file={file} />
                        ))}
                    </div>
                </div>
            </div>
            <Manager ref={managerRef} />
        </>
    )
}



export default FilesList;