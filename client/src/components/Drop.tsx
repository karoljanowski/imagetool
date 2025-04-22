'use client'

import { useEffect, useState } from "react";
import upload from "../lib/upload";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloudIcon } from "lucide-react";

const Drop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const router = useRouter();

    const handleDrop = async (e: DragEvent) => {
        e.preventDefault();
        if (!e.dataTransfer || e.dataTransfer.files.length === 0) return;
        const files = Array.from(e.dataTransfer.files);
        router.push("/files");
        for (const file of files) {
            upload(file);
        }
        setIsDragging(false);
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        if (e.clientX <= 0 || e.clientY <= 0 || 
            e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
            setIsDragging(false);
        }
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
        <AnimatePresence>
            {isDragging && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="w-full max-w-3xl h-80 border-2 border-dashed border-blue-400/50 rounded-2xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full transform scale-75 -z-10"></div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <UploadCloudIcon strokeWidth={1} className="w-24 h-24 text-blue-400 mb-6" />
                            </motion.div>
                        </div>
                        
                        <motion.h2 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-4xl font-bold text-white mb-3"
                        >
                            Drop files anywhere
                        </motion.h2>
                        
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-300 text-center max-w-lg"
                        >
                            Release to upload and process your files instantly
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Drop;