'use client'

import { useEffect, useState } from "react";
import upload from "../lib/upload";
import { useRouter } from "next/navigation";

const Drop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const router = useRouter();

    const handleDrop = async (e: DragEvent) => {
        e.preventDefault();
        if (!e.dataTransfer || e.dataTransfer.files.length === 0) return;
        const file = e.dataTransfer.files[0];
        router.push("/files");
        upload(file);
        setIsDragging(false);
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }

    const handleDragLeave = () => {
        setIsDragging(false);
    }

    useEffect(() => {
        window.addEventListener("drop", handleDrop);
        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("dragleave", handleDragLeave);
        return () => {
            window.removeEventListener("drop", handleDrop);
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("dragleave", handleDragLeave);
        }
    }, []);
    
    return (
        isDragging && (
            <div className="fixed top-0 h-[100svh] left-0 right-0 bg-black/80 z-50 p-16">
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="corner top-left"></div>
                        <div className="corner top-right"></div>
                        <div className="corner bottom-left"></div>
                        <div className="corner bottom-right"></div>
                        <p className="text-white text-8xl font-medium uppercase">Drop files anywhere</p>
                </div>
            </div>
        )
    )
}

export default Drop;