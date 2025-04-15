import Link from "next/link";
import { ImageIcon } from "lucide-react";

const Header = () => {
    return (
        <div className="flex justify-between items-center px-4 py-8 container mx-auto">
            <Link href="/" className="flex items-center gap-2 font-medium">
                <ImageIcon className="w-5 h-5" />
                TOOL
            </Link>
            <div className="flex items-center gap-4">
                <Link href="/upload" className="text-sm font-medium hover:text-neutral-400 transition-colors">Upload</Link>
                <Link href="/about" className="text-sm font-medium hover:text-neutral-400 transition-colors">About</Link>
                <Link href="/contact" className="text-sm font-medium hover:text-neutral-400 transition-colors">Contact</Link>
            </div>
        </div>
    )
}

export default Header;