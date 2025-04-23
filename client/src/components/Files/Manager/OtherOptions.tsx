import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsIcon } from "lucide-react";
import { File } from "@/lib/types/file";
import { Dispatch, SetStateAction } from "react";


const OtherOptions = ({ setFiles, selectedFilesIds }: { 
    setFiles: Dispatch<SetStateAction<File[]>>, 
    selectedFilesIds: String[]
}) => {

    const handleRemoveBackground = (checked: boolean) => {
        setFiles(prevFiles => prevFiles.map(file => {
            if (selectedFilesIds.includes(file.id)) {
                return { ...file, processedRemovedBackground: checked };
            }
            return file;
        }));
    }

    const handleCompress = (checked: boolean) => {
        setFiles(prevFiles => prevFiles.map(file => {
            if (selectedFilesIds.includes(file.id)) {
                return { ...file, processedCompressed: checked };
            }
            return file;
        }));
    }
    
    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-sm flex items-center gap-2">
                <SettingsIcon className="h-4 w-4 text-neutral-300" />
                Other options
            </span>
            <div className="flex items-center gap-2">
                <Switch onCheckedChange={handleRemoveBackground} />
                <Label htmlFor="airplane-mode">Remove background</Label>
            </div>
            <div className="flex items-center gap-2">
                <Switch onCheckedChange={handleCompress} />
                <Label htmlFor="airplane-mode">Compress image</Label>
            </div>
        </div>
    )
}

export default OtherOptions;