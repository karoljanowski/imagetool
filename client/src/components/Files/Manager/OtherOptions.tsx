import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsIcon } from "lucide-react";
import { NewFilesSettings, File } from "@/lib/types/file";


const OtherOptions = ({ setNewFilesSettings, selectedFiles, newFilesSettings }: { 
    setNewFilesSettings: (newFilesSettings: NewFilesSettings[]) => void, 
    selectedFiles: File[],
    newFilesSettings: NewFilesSettings[]
}) => {

    const handleRemoveBackground = (checked: boolean) => {
        const updatedSettings = newFilesSettings.map(setting => {
            if (selectedFiles.some(file => file.id === setting.fileId)) {
                return { ...setting, removeBackground: checked };
            }
            return setting;
        });
        setNewFilesSettings(updatedSettings);
    }

    const handleCompress = (checked: boolean) => {
        const updatedSettings = newFilesSettings.map(setting => {
            if (selectedFiles.some(file => file.id === setting.fileId)) {
                return { ...setting, compress: checked };
            }
            return setting;
        });
        setNewFilesSettings(updatedSettings);
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