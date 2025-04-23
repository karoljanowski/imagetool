import FormatOptions from "./FormatOptions";
import ManagerItem from "./ManagerItem";
import ResizeOptions from "./ResizeOptions";
import OtherOptions from "./OtherOptions";
import ActionButtons from "./ActionButtons";
import { File } from "@/lib/types/file";
import { forwardRef, ForwardedRef, Dispatch, SetStateAction } from "react";

const Manager = forwardRef(({ files, selectedFilesIds, setFiles }: { 
    files: File[],
    selectedFilesIds: string[], 
    setFiles: Dispatch<SetStateAction<File[]>>
}, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className="fixed bottom-8 left-0 w-full">
            <div className="container mx-auto px-4 bg-neutral-900/90 border border-neutral-800/50 backdrop-blur-md rounded-md grid grid-cols-[2fr_1fr_1fr_auto] p-2 gap-4">
                <ManagerItem>
                    <ResizeOptions setFiles={setFiles} selectedFilesIds={selectedFilesIds} />
                </ManagerItem>
                <ManagerItem>
                    <FormatOptions setFiles={setFiles} selectedFilesIds={selectedFilesIds} />
                </ManagerItem>
                <ManagerItem>
                    <OtherOptions setFiles={setFiles} selectedFilesIds={selectedFilesIds} />
                </ManagerItem>
                <ManagerItem>
                    <ActionButtons files={files} selectedFilesIds={selectedFilesIds} />
                </ManagerItem>
            </div>
        </div>
    )
})

Manager.displayName = "Manager";

export default Manager; 