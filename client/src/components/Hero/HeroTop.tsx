'use client'
import { ArrowUpIcon, SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import Link from "next/link";
const HeroTop = () => {
    return (
        <div className="space-y-8">
            <HeroText />
            <HeroStats />
        </div>
    )
}

const HeroText = () => {
    return (
        <div className="space-y-6">
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/20">
                    <SparklesIcon className="w-3.5 h-3.5 mr-1.5" />
                    Easy • Fast • Powerful
                </span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
                Transform your 
                <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> images </span>
                </span>
                in seconds
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-lg text-gray-400 max-w-lg"
            >
                Upload, transform, and download your images with our all-in-one solution. No signup required.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="pt-2"
            >
                <Link href="/files">
                    <Button variant="secondary" size="lg">
                        Upload your image
                    </Button>
                </Link>
            </motion.div>
        </div>
    )
}

const HeroStats = () => {
    const stats = [
        { label: "Image Formats", value: "4" },
        { label: "Tools Available", value: "4" },
        { label: "Processed Images", value: "10K+" }
    ]
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-8"
        >
            {stats.map((stat, index) => (
                <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                </div>
            ))}
        </motion.div>
    )
}

export default HeroTop;