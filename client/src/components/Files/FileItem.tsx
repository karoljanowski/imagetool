import { ArrowRightIcon, CheckCircleIcon, FileCog2Icon, ImageUpscale, Loader2Icon, TrashIcon, CheckIcon, XIcon, DownloadIcon } from "lucide-react"
import Image from "next/image"
import { File, FileStatus } from "@/lib/types/file"
import { useState } from "react"
import { formatFileSize } from "@/lib/utils"
import { Button } from "../ui/button"
import { deleteFile } from "@/lib/delete"
import { toast } from "sonner"
import { useFiles } from "@/lib/context/FileContext"
import getToken from "@/lib/token"
import Link from "next/link"
import { donwloadSingleFile } from "@/lib/download"

interface FileItemProps {
    file: File;
}

const FileItem = ({ file }: FileItemProps) => {
    const { selectedFilesIds, setSelectedFilesIds, fetchFiles } = useFiles();
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSelect = () => {
        if (file.status === 'UPLOADING' || file.status === 'PROCESSING') {
            return;
        }

        if (selectedFilesIds.includes(file.id)) {
            setSelectedFilesIds(selectedFilesIds.filter((id) => id !== file.id));
        } else {
            setSelectedFilesIds([...selectedFilesIds, file.id]);
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsDeleting(true);
        const data = await deleteFile(file.id);
        if (data.success) {
            fetchFiles();
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        setIsDeleting(false);
    }

    return (
        <div 
            className={`flex flex-col gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-lg p-3 transition-all duration-200 shadow-sm hover:shadow-md border-1 ${selectedFilesIds.includes(file.id) ? 'border-white bg-white/15' : 'border-transparent'}`}
            onClick={handleSelect}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex gap-3">
                <ImagePreview file={file} />
                <div className="flex flex-col justify-between flex-1">
                    <div className="flex flex-col gap-1 mb-2">
                        <div className="text-sm font-medium text-white truncate" title={file.name}>
                            {file.name}
                        </div>
                        
                        {file.size && (
                            <div className="text-xs text-neutral-300 flex items-center gap-1">
                                {formatFileSize(file.size)} 
                                {file.processedSize && (
                                    <>
                                        <ArrowRightIcon className="w-3 h-3 text-neutral-300" />
                                        {formatFileSize(file.processedSize)}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* Resize */}
                        <div className="flex items-center gap-2">
                            <ImageUpscale className="w-4 h-4 text-neutral-300 shrink-0" />
                            <div className="h-6 bg-neutral-600/70 rounded-md px-2 py-1 text-xs flex-1 text-center text-neutral-200">{file.originalWidth}x{file.originalHeight}</div>
                            <ArrowRightIcon className="w-3 h-3 text-neutral-300 shrink-0" />
                            <div className="h-6 bg-neutral-600/70 rounded-md px-2 py-1 text-xs flex-1 text-center text-neutral-200">{file.processedWidth}x{file.processedHeight}</div>
                        </div>

                        {/* Format */}
                        <div className="flex items-center gap-2">
                            <FileCog2Icon className="w-4 h-4 text-neutral-300 shrink-0" />
                            <div className="h-6 bg-neutral-600/70 rounded-md px-2 py-1 text-xs flex-1 text-center text-neutral-200">{file.originalFormat}</div>
                            <ArrowRightIcon className="w-3 h-3 text-neutral-300 shrink-0" />
                            <div className="h-6 bg-neutral-600/70 rounded-md px-2 py-1 text-xs flex-1 text-center text-neutral-200">{file.processedFormat}</div>
                        </div>

                        <OtherOptionsInfo checked={file.processedRemovedBackground || false} option="Remove background" />
                        <OtherOptionsInfo checked={file.processedCompressed || false} option="Compress image" />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-start gap-1 items-center w-full border-t border-neutral-600/50 pt-2">
                <StatusBadge status={file.status} />

                {file.status === 'PROCESSED' && file.processedFormat && (
                    <DownloadButton fileId={file.id} processedFormat={file.processedFormat} name={file.name} />
                )}

                {isHovered && file.status !== 'UPLOADING' && (
                    <Button variant="destructive" className="p-1 ml-auto" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? (
                            <Loader2Icon className="w-3 h-3 animate-spin" />
                        ) : (
                            <TrashIcon className="w-3 h-3" />
                        )}
                    </Button>
                )}
            </div>
        </div>
    )
}

const ImagePreview = ({ file }: { file: File }) => {
    return (
        <div className="w-[150px] h-[150px] bg-neutral-700 rounded-md flex items-center justify-center overflow-hidden">
            {file.status === 'UPLOADING' ? (
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

const StatusBadge = ({ status }: { status: FileStatus }) => {
    const statusConfig = {
        'UPLOADING': {
            icon: <Loader2Icon className="w-3 h-3 animate-spin" />,
            text: 'Uploading',
            bgColor: 'bg-yellow-500/10',
            textColor: 'text-yellow-400',
        },
        'UPLOADED': {
            icon: <CheckCircleIcon className="w-3 h-3" />,
            text: 'Uploaded',
            bgColor: 'bg-green-500/10',
            textColor: 'text-green-400',
        },
        'PROCESSING': {
            icon: <Loader2Icon className="w-3 h-3 animate-spin" />,
            text: 'Processing',
            bgColor: 'bg-yellow-500/10',
            textColor: 'text-yellow-400',
        },
        'PROCESSED': {
            icon: <CheckCircleIcon className="w-3 h-3" />,
            text: 'Processed',
            bgColor: 'bg-blue-500/30',
            textColor: 'text-blue-100',
        },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.UPLOADING;

    return (
        <div className={`text-xs rounded-full px-2 py-1 flex items-center gap-1.5 ${config.bgColor} ${config.textColor}`}>
            {config.icon}
            {config.text}
        </div>
    )
}

const DownloadButton = ({ fileId, processedFormat, name }: { fileId: string, processedFormat: string, name: string }) => {
    const token = getToken();

    return (
        <Button className="text-xs py-1 px-2 bg-blue-500/75 hover:bg-blue-500 rounded-full" onClick={() => donwloadSingleFile(token, fileId, processedFormat, name)}>
                <DownloadIcon className="w-2 h-2" />
                Download
        </Button>
    )
}

const OtherOptionsInfo = ({ checked, option }: { checked: boolean, option: string }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                {checked ? (
                    <CheckIcon className="w-4 h-4 text-green-400" />
                ) : (
                    <XIcon className="w-4 h-4 text-red-400" />
                )}
                <div className="text-xs">{option}</div>
            </div>
        </div>
    )
}

export default FileItem;