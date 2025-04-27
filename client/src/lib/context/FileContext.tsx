'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { File } from "../types/file";
import { toast } from "sonner";
import getFiles from "../files";

interface FileContextType {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
    selectedFilesIds: string[];
    setSelectedFilesIds: Dispatch<SetStateAction<string[]>>;
    fetchFiles: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFilesIds, setSelectedFilesIds] = useState<string[]>([]);

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
    
    
    return (
        <FileContext.Provider value={{ files, setFiles, selectedFilesIds, setSelectedFilesIds, fetchFiles }}>{children}</FileContext.Provider>
    );
};

export const useFiles = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error("useFiles must be used within a FileProvider");
    }
    return context;
};