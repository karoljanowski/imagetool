import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageIcon } from "lucide-react";

const BackgroundRemovalOptions = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-sm flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-neutral-300" />
                Background removal
            </span>
            <Switch />
            <Label htmlFor="airplane-mode">Remove</Label>
        </div>
    )
}

export default BackgroundRemovalOptions;