import { Button } from "@/components/ui/button";
import { Loader2Icon, PlayIcon } from "lucide-react";
import processFile from "@/lib/process";
import { useFiles } from "@/lib/context/FileContext";
import { useState, useEffect } from "react";
import { downloadAllFiles } from "@/lib/download";
import getToken from "@/lib/token";

const ActionButtons = () => {
    const { files, selectedFilesIds, setStatus, fetchFiles } = useFiles();
    const [haveProcessedFiles, setHaveProcessedFiles] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleProcess = () => {
        files.forEach(async (file) => {
            if (selectedFilesIds.includes(file.id)) {
                processFile(file, setStatus, fetchFiles);
            }
        });
    }

    const handleDownload = () => {
        const token = getToken();

        setIsDownloading(true);
        downloadAllFiles(token).then(() => {
            setIsDownloading(false);
        });
    }

    useEffect(() => {
        setHaveProcessedFiles(files.some(file => file.status === "PROCESSED"));
    }, [files]);

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm flex items-center gap-2">
                <PlayIcon className="h-4 w-4 text-neutral-300" />
                Action buttons
            </span>
            <Button disabled={selectedFilesIds.length === 0} className="bg-blue-500/50 disabled:bg-blue-500/20 hover:bg-blue-500" onClick={handleProcess}>
                Process {selectedFilesIds.length} images
            </Button>
            <Button disabled={!haveProcessedFiles || isDownloading} className="bg-green-500/50 disabled:bg-green-500/20 hover:bg-green-500" onClick={handleDownload}>
                {isDownloading ? (
                    <div className="flex items-center gap-2">
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                        Downloading...
                    </div>
                ) : (
                    <span>
                        Download processed
                    </span>
                )}
            </Button>
        </div>
    )
}   

export default ActionButtons;