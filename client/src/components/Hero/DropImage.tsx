'use client'
import { ArrowUpCircleIcon } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

const DropImage = () => {
    return (
        <div className="flex w-full max-h-[300px] h-full justify-end items-center gap-32">
            <HeroImage />
            <HeroDrop />
        </div>
    )
}

const HeroImage = () => {
    return (
        <div className="flex w-1/2 h-3/4 justify-end">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
                className="rounded-full h-full overflow-hidden"
            >
                <Image src="/bgg.webp" alt="Hero" width={2880} height={600} className="object-cover w-full h-full brightness-75 scale-200" />
            </motion.div>
        </div>
    )
}

const HeroDrop = () => {
    return (
        <div className="py-6 h-full w-1/2">
            <div className="relative w-full h-full rounded-lg">
                <div className="corner top-left" />
                <div className="corner top-right" />
                <div className="corner bottom-left" />
                <div className="corner bottom-right" />
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <ArrowUpCircleIcon strokeWidth={0.5} className="w-24 h-24 text-white mb-3" />
                    <p className="text-sm uppercase">Drop your image here</p>
                    <p className="text-sm uppercase">or click to upload</p>
                </div>
            </div>
        </div>
    )
}

export default DropImage;