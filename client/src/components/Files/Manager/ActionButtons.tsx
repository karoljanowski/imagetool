import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { File } from "@/lib/types/file";
import processFile from "@/lib/process";

const ActionButtons = ({ files, selectedFilesIds }: { files: File[], selectedFilesIds: string[] }) => {

    const handleProcess = () => {
        files.forEach(async (file) => {
            if (selectedFilesIds.includes(file.id)) {
                processFile(file);
            }
        });
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm flex items-center gap-2">
                <PlayIcon className="h-4 w-4 text-neutral-300" />
                Action buttons
            </span>
            <Button disabled={selectedFilesIds.length === 0} className="bg-blue-500/50 disabled:bg-blue-500/20 hover:bg-blue-500" onClick={handleProcess}>
                Process {selectedFilesIds.length} images
            </Button>
            <Button disabled className="bg-green-500/50 disabled:bg-green-500/20 hover:bg-green-500">
                Download processed
            </Button>
        </div>
    )
}   

export default ActionButtons;