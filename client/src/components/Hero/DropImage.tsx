'use client'
import { UploadCloudIcon, CheckIcon } from "lucide-react"
import { motion } from "motion/react"
import DropButton from "../DropButton"

const DropImage = () => {
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-full"
        >
            <div className="bg-gradient-to-br from-neutral-900/70 to-neutral-900/80 backdrop-blur-md border border-neutral-800/50 rounded-2xl h-full overflow-hidden shadow-xl shadow-black/30">
                <div className="p-6 h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-blue-500/30 rounded-xl px-6 py-12 text-center">
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                className="relative z-0"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full transform scale-75 -z-10"></div>
                                <UploadCloudIcon strokeWidth={1.5} className="w-16 h-16 md:w-20 md:h-20 text-blue-400 mb-6" />
                            </motion.div>
                            
                            <h3 className="text-xl font-medium text-white mb-2">Drop your image here</h3>
                            <p className="text-sm text-neutral-400 mb-6">WEBP, PNG, JPG or HEIC</p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <DropButton size="default" variant="secondary" text="Choose file" className="w-full" />
                            </div>
                            
                            <div className="mt-8 w-full">
                                <div className="flex items-center gap-3 text-xs text-neutral-400">
                                    <hr className="flex-grow border-neutral-700" />
                                    <span>SUPPORTED OPERATIONS</span>
                                    <hr className="flex-grow border-neutral-700" />
                                </div>
                                
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {['Compress', 'Resize', 'Convert', 'Remove BG'].map((op) => (
                                        <div key={op} className="bg-neutral-700/50 px-3 py-2 rounded text-xs text-center text-neutral-200 flex items-center justify-center gap-1.5">
                                            <CheckIcon className="w-3 h-3 text-green-400" />
                                            {op}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default DropImage;