import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsIcon } from "lucide-react";

const OtherOptions = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-sm flex items-center gap-2">
                <SettingsIcon className="h-4 w-4 text-neutral-300" />
                Other options
            </span>
            <div className="flex items-center gap-2">
                <Switch />
                <Label htmlFor="airplane-mode">Remove background</Label>
            </div>
            <div className="flex items-center gap-2">
                <Switch />
                <Label htmlFor="airplane-mode">Compress image</Label>
            </div>
        </div>
    )
}

export default OtherOptions;