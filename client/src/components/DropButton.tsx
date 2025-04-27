import upload from "@/lib/upload";
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useFiles } from "@/lib/context/FileContext";

interface DropButtonProps {
    size?: "sm" | "default";
    variant?: "primary" | "secondary";
    text: string;
    className?: string;
}

const DropButton = ({ size = "default", variant = "primary", text, className }: DropButtonProps) => {
    const router = useRouter();
    const { addFile, fetchFiles } = useFiles();
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files || e.target.files.length === 0) return;
        const files = Array.from(e.target.files);
        router.push("/files");
        for (const file of files) {
            upload(file, addFile, fetchFiles);
        }
    }

    return (
        <>
            <input 
                type="file" 
                name="file" 
                id="file-input" 
                className="hidden"
                onChange={handleFileChange}
                accept=".webp,.png,.jpg,.jpeg,.heic"
                multiple
            />
            <Button variant={variant} className={className} asChild size={size}>
                <label htmlFor="file-input">
                    {text}
                </label>
            </Button>
        </>
    )
}

export default DropButton;