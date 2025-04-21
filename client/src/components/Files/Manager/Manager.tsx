import FormatOptions from "./FormatOptions";
import ManagerItem from "./ManagerItem";
import ResizeOptions from "./ResizeOptions";
import OtherOptions from "./OtherOptions";
import ActionButtons from "./ActionButtons";
import { File, NewFilesSettings } from "@/lib/types/file";

const Manager = ({ selectedFiles, setNewFilesSettings, newFilesSettings }: { 
    selectedFiles: File[], 
    setNewFilesSettings: (newFilesSettings: NewFilesSettings[]) => void,
    newFilesSettings: NewFilesSettings[]
}) => {
    return (
        <div className="fixed bottom-8 left-0 w-full">
            <div className="container mx-auto px-4 bg-white/10 backdrop-blur-md rounded-md grid grid-cols-[2fr_1fr_1fr_auto] p-2 gap-4">
                <ManagerItem>
                    <ResizeOptions setNewFilesSettings={setNewFilesSettings} selectedFiles={selectedFiles} newFilesSettings={newFilesSettings} />
                </ManagerItem>
                <ManagerItem>
                    <FormatOptions setNewFilesSettings={setNewFilesSettings} selectedFiles={selectedFiles} newFilesSettings={newFilesSettings} />
                </ManagerItem>
                <ManagerItem>
                    <OtherOptions />
                </ManagerItem>
                <ManagerItem>
                    <ActionButtons selectedFiles={selectedFiles} />
                </ManagerItem>
            </div>
        </div>
    )
}

export default Manager; 