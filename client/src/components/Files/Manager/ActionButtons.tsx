import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { File } from "@/lib/types/file";

const ActionButtons = ({ selectedFiles }: { selectedFiles: File[] }) => {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm flex items-center gap-2">
                <PlayIcon className="h-4 w-4 text-neutral-300" />
                Action buttons
            </span>
            <Button disabled={selectedFiles.length === 0}>
                Process {selectedFiles.length} images
            </Button>
            <Button disabled={selectedFiles.length === 0}>
                Download processed
            </Button>
        </div>
    )
}   

export default ActionButtons;