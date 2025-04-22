import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon, UnlockIcon, ScalingIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NewFilesSettings, File } from "@/lib/types/file";

const ResizeOptions = ({ setNewFilesSettings, selectedFiles, newFilesSettings }: { 
    setNewFilesSettings: (newFilesSettings: NewFilesSettings[]) => void, 
    selectedFiles: File[],
    newFilesSettings: NewFilesSettings[]
}) => {
    const [width, setWidth] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>('');

    const handleResize = () => {
        if (!width && !height) return;
        
        const updatedSettings = newFilesSettings.map(setting => {
            if (selectedFiles.some(file => file.id === setting.fileId)) {
                return {
                    ...setting,
                    newWidth: width || setting.newWidth,
                    newHeight: height || setting.newHeight
                };
            }
            return setting;
        });

        setNewFilesSettings(updatedSettings);
    }
    
    useEffect(() => {
        handleResize();
    }, [width, height]);

    useEffect(() => {
        if (selectedFiles.length > 0) {
            setWidth('');
            setHeight('');
        }
    }, [selectedFiles]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-sm flex items-center gap-2">
                <ScalingIcon className="h-4 w-4 text-neutral-300" />
                Resize options
            </span>
            <Tabs defaultValue="pixels" className="w-full">
                <TabsList className="w-full mb-1">
                    <TabsTrigger value="pixels">Pixels</TabsTrigger>
                    <TabsTrigger value="percentage">Percentage</TabsTrigger>
                </TabsList>
                <TabsContent value="pixels">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Input 
                                type="number" 
                                placeholder="Width" 
                                value={width}
                                min={1}
                                onChange={(e) => setWidth(e.target.value ? parseInt(e.target.value) : '')}
                                className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-neutral-400">W</span>
                        </div>
                        <span className="text-xs text-neutral-400">x</span>
                        <div className="relative flex-1">
                            <Input 
                                type="number" 
                                placeholder="Height" 
                                value={height}
                                min={1}
                                onChange={(e) => setHeight(e.target.value ? parseInt(e.target.value) : '')}
                                className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-neutral-400">H</span>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="percentage">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Button 
                                size="sm" 
                                className="flex-1" 
                            >
                                25%
                            </Button>
                            <Button 
                                size="sm" 
                                className="flex-1" 
                            >
                                50%
                            </Button>
                            <Button 
                                size="sm" 
                                className="flex-1" 
                            >
                                75%
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ResizeOptions;
