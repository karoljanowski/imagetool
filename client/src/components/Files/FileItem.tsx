import { ArrowRightIcon, CheckCircleIcon, FileCog2Icon, FileIcon, ImageUpscale, Loader2Icon, TrashIcon, XCircleIcon } from "lucide-react"
import Image from "next/image"
import { File, NewFilesSettings } from "@/lib/types/file"
import { useState } from "react"
import { formatFileSize } from "@/lib/utils"

interface FileItemProps {
    file: File;
    selectedFiles: File[];
    setSelectedFiles: (files: File[]) => void;
    newFilesSettings: NewFilesSettings[];
}

const FileItem = ({ file, selectedFiles, setSelectedFiles, newFilesSettings }: FileItemProps) => {

    const handleSelect = () => {
        if (selectedFiles.includes(file)) {
            setSelectedFiles(selectedFiles.filter((f) => f.id !== file.id));
        } else {
            setSelectedFiles([...selectedFiles, file]);
        }
    }
    return (
        <div 
            className={`flex flex-col gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-lg p-3 transition-all duration-200 shadow-sm hover:shadow-md border-1 ${selectedFiles.includes(file) ? 'border-white bg-white/15' : 'border-transparent'}`}
            onClick={handleSelect}
        >
            <div className="flex gap-3">
                <ImagePreview file={file} />
                <div className="flex flex-col justify-between flex-1">
                    <div className="flex flex-col gap-1 mb-2">
                        <div className="text-sm font-medium text-white truncate" title={file.name}>
                            {file.name}
                        </div>
                        
                        {file.size && (
                            <div className="text-xs text-neutral-300">
                                {formatFileSize(file.size)}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <ImageUpscale className="w-4 h-4 text-neutral-300 shrink-0" />
                            <div className="bg-neutral-600/70 rounded-md px-2 py-1 text-xs flex-1 text-center text-neutral-200">{file.originalWidth}x{file.originalHeight}</div>
                            <ArrowRightIcon className="w-3 h-3 text-neutral-300 shrink-0" />
                            <div className="bg-neutral-600/70 rounded-md px-2 py-1 text-xs flex-1 text-center text-neutral-200">{newFilesSettings.find((setting) => setting.fileId === file.id)?.newWidth}x{newFilesSettings.find((setting) => setting.fileId === file.id)?.newHeight}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileCog2Icon className="w-4 h-4 text-neutral-300 shrink-0" />
                            <div className="bg-neutral-600/70 rounded-md px-2 py-1 text-xs flex-1 text-center text-neutral-200">{file.originalFormat}</div>
                            <ArrowRightIcon className="w-3 h-3 text-neutral-300 shrink-0" />
                            <div className="bg-neutral-600/70 rounded-md px-2 py-1 text-xs flex-1 text-center text-neutral-200">{newFilesSettings.find((setting) => setting.fileId === file.id)?.newFormat}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-between items-center w-full border-t border-neutral-600/50 pt-2">
                <StatusBadge status={file.status} />
                
            </div>
        </div>
    )
}

const ImagePreview = ({ file }: { file: File }) => {
    return (
        <div className="w-[100px] h-[100px] bg-neutral-700 rounded-md flex items-center justify-center overflow-hidden">
            {file.status === 'pending' ? (
                <div className="flex items-center justify-center w-full h-full">
                    <Loader2Icon className="w-8 h-8 text-neutral-300 animate-spin" />
                </div>
            ) : (
                <>
                    <Image 
                        src={file.url} 
                        alt={file.name} 
                        width={200} 
                        height={200} 
                        className="w-full h-full object-cover transition-transform" 
                    />
                </>
            )}
        </div>
    )
}

const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
        'pending': {
            icon: <Loader2Icon className="w-3 h-3 animate-spin" />,
            text: 'Processing',
            bgColor: 'bg-yellow-500/10',
            textColor: 'text-yellow-400',
        },
        'uploaded': {
            icon: <CheckCircleIcon className="w-3 h-3" />,
            text: 'Uploaded',
            bgColor: 'bg-green-500/10',
            textColor: 'text-green-400',
        },
        'error': {
            icon: <XCircleIcon className="w-3 h-3" />,
            text: 'Failed',
            bgColor: 'bg-red-500/10',
            textColor: 'text-red-400',
        }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
        <div className={`text-xs rounded-full px-2 py-1 flex items-center gap-1.5 ${config.bgColor} ${config.textColor}`}>
            {config.icon}
            {config.text}
        </div>
    )
}

export default FileItem;