'use client'
import { useState, useRef } from "react";
import Manager from "./Manager/Manager";
import FileItem from "./FileItem";
import { Button } from "../ui/button";
import { deleteAllFiles } from "@/lib/delete";
import { useFiles } from "@/lib/context/FileContext";
import DropButton from "../DropButton";
import { Skeleton } from "../ui/skeleton";

const FilesList = () => {
    const { files, selectedFilesIds, setSelectedFilesIds, fetchFiles, isLoading, isFirstLoad } = useFiles();
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
        await deleteAllFiles(fetchFiles);
        setIsDeletingAll(false);
    }

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="flex justify-between md:items-center flex-col md:flex-row">
                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-bold">Your uploads</h1>
                        <p className="text-xs md:text-sm text-neutral-400 mb-4">Select image and chose what you want to do with it</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSelectButton} size="sm" disabled={isLoading || files.length === 0}>
                            {selectedFilesIds.length === files.length ? 'Deselect all' : 'Select all'}
                        </Button>
                        <DropButton size="sm" variant="primary" text="Upload" />
                        <Button variant="destructive" onClick={handleDeleteAll} disabled={isDeletingAll || isLoading || files.length === 0} size="sm">
                            {isDeletingAll ? 'Deleting...' : 'Delete all'}
                        </Button>
                    </div>
                </div>
                <div ref={listRef} className="overflow-y-auto relative mask-scroll-container" 
                    style={{ height: calculateFilesListHeight() }}>
                    {isFirstLoad ? (
                        <FilesListSkeleton />
                    ) : files.length === 0 ? (
                        <EmptyFilesList />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
                            {files.map((file) => (
                                <FileItem key={file.id} file={file} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Manager ref={managerRef} />
        </>
    )
}

const FilesListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-56" />
            ))}
        </div>
    )
}

const EmptyFilesList = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <p className="text-lg text-neutral-200 mb-2">No files uploaded yet</p>
            <p className="text-sm text-neutral-300">Drop your files here or click the upload button</p>
        </div>
    )
}

export default FilesList;