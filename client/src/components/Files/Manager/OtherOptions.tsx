import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { useFiles } from "@/lib/context/FileContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const OtherOptions = () => {
    const [removeBackground, setRemoveBackground] = useState(false);
    // const [removeBackgroundDisabled, setRemoveBackgroundDisabled] = useState(false);
    const { selectedFilesIds, setFiles } = useFiles();

    const handleRemoveBackground = (checked: boolean) => {
        setRemoveBackground(checked);
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

    // useEffect(() => {
    //     const selectedFiles = files.filter(file => selectedFilesIds.includes(file.id));
    //     const hasJpg = selectedFiles.some(file => file.processedFormat === "jpg");
    //     setRemoveBackgroundDisabled(hasJpg);
    //     setRemoveBackground(prev => prev && !hasJpg);
    // }, [selectedFilesIds, files]);
    
    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-sm flex items-center gap-2">
                <SettingsIcon className="h-4 w-4 text-neutral-300" />
                Other options
            </span>
            {/* <div className="flex items-center gap-2">
                <Switch checked={removeBackground} onCheckedChange={handleRemoveBackground} id="remove-background" disabled={removeBackgroundDisabled} />
                <Label htmlFor="remove-background">Remove background</Label>
            </div> */}
       
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                        <Switch checked={removeBackground} onCheckedChange={handleRemoveBackground} id="remove-background" disabled />
                        <Label htmlFor="remove-background">Remove background</Label>
                    </div>
                </TooltipTrigger>
                <TooltipContent align="start">
                    Do not available yet
                </TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-2">
                <Switch onCheckedChange={handleCompress} id="compress" />
                <Label htmlFor="compress">Compress image</Label>
            </div>
        </div>
    )
}

export default OtherOptions;