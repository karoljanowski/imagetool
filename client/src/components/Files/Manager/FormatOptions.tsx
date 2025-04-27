import { Button } from "@/components/ui/button"
import { FileCog2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useFiles } from "@/lib/context/FileContext";
import { FormatOptionsEnum } from "@/lib/types/file";

const FormatOptions = () => {
    const { selectedFilesIds, setFiles } = useFiles();
    const [selectedFormat, setSelectedFormat] = useState<FormatOptionsEnum>(FormatOptionsEnum.PNG);
    const formats = [
        { id: FormatOptionsEnum.PNG, label: 'PNG', description: 'Lossless, supports transparency' },
        { id: FormatOptionsEnum.JPEG, label: 'JPEG', description: 'Smaller file size, no transparency' },
        { id: FormatOptionsEnum.WEBP, label: 'WEBP', description: 'Modern format, great compression' },
        { id: FormatOptionsEnum.AVIF, label: 'AVIF', description: 'Next-gen format, best compression' }
    ];

    useEffect(() => {
        setFiles(prevFiles => prevFiles.map(file => {
            if (selectedFilesIds.includes(file.id)) {
                return { ...file, processedFormat: selectedFormat, processedRemovedBackground: selectedFormat === FormatOptionsEnum.JPEG ? false : file.processedRemovedBackground };
            }
            return file;
        }));
    }, [selectedFormat, selectedFilesIds]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-sm flex items-center gap-2">
                <FileCog2Icon className="h-4 w-4 text-neutral-300" />
                Format options
            </span>
            <div className="grid grid-cols-2 gap-2">
                {formats.map(format => (
                    <Button 
                        key={format.id}
                        size="sm" 
                        onClick={() => setSelectedFormat(format.id)}
                        className={`relative ${selectedFormat === format.id ? 'bg-white/30 ring-2 ring-white/30' : ''}`}
                        title={format.description}
                    >
                        {format.label}
                        {selectedFormat === format.id && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                    </Button>
                ))}
            </div>
            <div className="flex items-center">
                <div className="text-xs text-neutral-400">{formats.find(f => f.id === selectedFormat)?.description}</div>
            </div>
        </div>
    )
}

export default FormatOptions;