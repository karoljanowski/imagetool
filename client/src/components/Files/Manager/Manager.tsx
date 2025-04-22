import FormatOptions from "./FormatOptions";
import ManagerItem from "./ManagerItem";
import ResizeOptions from "./ResizeOptions";
import OtherOptions from "./OtherOptions";
import ActionButtons from "./ActionButtons";
import { File, NewFilesSettings } from "@/lib/types/file";
import { forwardRef, ForwardedRef } from "react";

const Manager = forwardRef(({ selectedFiles, setNewFilesSettings, newFilesSettings }: { 
    selectedFiles: File[], 
    setNewFilesSettings: (newFilesSettings: NewFilesSettings[]) => void,
    newFilesSettings: NewFilesSettings[]
}, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className="fixed bottom-8 left-0 w-full">
            <div className="container mx-auto px-4 bg-neutral-900/90 border border-neutral-800/50 backdrop-blur-md rounded-md grid grid-cols-[2fr_1fr_1fr_auto] p-2 gap-4">
                <ManagerItem>
                    <ResizeOptions setNewFilesSettings={setNewFilesSettings} selectedFiles={selectedFiles} newFilesSettings={newFilesSettings} />
                </ManagerItem>
                <ManagerItem>
                    <FormatOptions setNewFilesSettings={setNewFilesSettings} selectedFiles={selectedFiles} newFilesSettings={newFilesSettings} />
                </ManagerItem>
                <ManagerItem>
                    <OtherOptions setNewFilesSettings={setNewFilesSettings} selectedFiles={selectedFiles} newFilesSettings={newFilesSettings} />
                </ManagerItem>
                <ManagerItem>
                    <ActionButtons selectedFiles={selectedFiles} />
                </ManagerItem>
            </div>
        </div>
    )
})

export default Manager; 