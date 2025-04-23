'use client'
import getFiles from "@/lib/files";
import { useEffect, useState, useRef } from "react";
import Manager from "./Manager/Manager";
import { File } from "@/lib/types/file";
import FileItem from "./FileItem";
import { Button } from "../ui/button";
import { deleteAllFiles } from "@/lib/delete";
import { toast } from "sonner";


const FilesList = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFilesIds, setSelectedFilesIds] = useState<String[]>([]);
    const [isDeletingAll, setIsDeletingAll] = useState(false);
    const managerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    console.log(files);

    const calculateFilesListHeight = () => {
        const listFromTop = listRef.current?.offsetTop;
        const managerHeight = managerRef.current?.offsetHeight;
        const height = `calc(100svh - ${listFromTop}px - ${managerHeight}px - 50px)`;
        return height;
    }

    const fetchFiles = async () => {
        const data = await getFiles();
        if (data.success) {
            setFiles(data.filesList.map((file: File) => ({
                ...file,
                processedFormat: file.processedFormat || file.originalFormat,
                processedWidth: file.processedWidth || file.originalWidth,
                processedHeight: file.processedHeight || file.originalHeight,
                processedRemovedBackground: file.processedRemovedBackground || false,
                processedCompressed: file.processedCompressed || false,
                processedPath: file.processedPath || file.originalPath
            })));
        } else {
            toast.error(data.message);
        }
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

        const ws = new WebSocket(`ws://localhost:3001`);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'upload_complete' || data.type === 'upload_init' || data.type === 'upload_error') {
                fetchFiles();
            }
            if (data.type === 'upload_error') {
                toast.error('Failed to upload file');
            }

            if (data.type === 'upload_complete') {
                toast.success('File uploaded successfully');
            }
        }
    }, []);

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="flex justify-between md:items-center flex-col md:flex-row">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Your uploads</h1>
                        <p className="text-sm text-neutral-400 mb-4">Select image and chose what you want to do with it</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSelectButton}>
                            {selectedFilesIds.length === files.length ? 'Deselect all' : 'Select all'}
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAll} disabled={isDeletingAll}>
                            {isDeletingAll ? 'Deleting...' : 'Delete all'}
                        </Button>
                    </div>
                </div>
                <div ref={listRef} className="overflow-y-auto relative mask-scroll-container" 
                    style={{ height: calculateFilesListHeight() }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
                        {files && files.map((file) => (
                            <FileItem key={file.id} file={file} selectedFilesIds={selectedFilesIds} setSelectedFilesIds={setSelectedFilesIds} fetchFiles={fetchFiles} />
                        ))}
                    </div>
                </div>
            </div>
            <Manager ref={managerRef} files={files} selectedFilesIds={selectedFilesIds} setFiles={setFiles} />
        </>
    )
}



export default FilesList;