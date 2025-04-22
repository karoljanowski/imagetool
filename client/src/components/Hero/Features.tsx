'use client'
import { DatabaseIcon, ScalingIcon, FileCogIcon, FullscreenIcon, ZapIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

const Features = () => {
    const features = [
        {
            title: "Compress",
            description: "Reduce file size without losing quality",
            icon: <DatabaseIcon strokeWidth={1.5} className="w-6 h-6 text-blue-400" />,
            color: "blue"
        },
        {
            title: "Resize",
            description: "Change dimensions to fit your needs",
            icon: <ScalingIcon strokeWidth={1.5} className="w-6 h-6 text-purple-400" />,
            color: "purple"
        },
        {
            title: "Convert",
            description: "Change between different file formats",
            icon: <FileCogIcon strokeWidth={1.5} className="w-6 h-6 text-pink-400" />,
            color: "pink"
        },
        {
            title: "Background",
            description: "Remove or change image backgrounds",
            icon: <FullscreenIcon strokeWidth={1.5} className="w-6 h-6 text-cyan-400" />,
            color: "cyan"
        }
    ]

    return (
        <div className="w-full">
            {/* Section Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-2 mb-3">
                    <ZapIcon className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Powerful Features
                    </h2>
                </div>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                    Our all-in-one solution provides everything you need to transform your images quickly and efficiently
                </p>
            </motion.div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`feature-card bg-gradient-to-br from-neutral-900/50 to-neutral-900/50 border border-neutral-800/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-${feature.color}-500/10 hover:border-${feature.color}-500/20 transition-all duration-300`}
                    >
                        <div className="p-6">
                            {feature.icon}
                            <h3 className="text-lg font-medium text-white mb-2 mt-3">{feature.title}</h3>
                            <p className="text-sm text-neutral-400">{feature.description}</p>
                        </div>
                        
                    </motion.div>
                ))}
            </div>
            
            {/* Action Bar */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12 text-center"
            >
                <Button variant="secondary" size="lg">
                    Try It Now
                </Button>
                <p className="mt-4 text-sm text-neutral-400">No account required. Try all features instantly.</p>
            </motion.div>
        </div>
    )
}

export default Features;