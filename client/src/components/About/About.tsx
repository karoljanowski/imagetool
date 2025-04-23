'use client'
import Image from "next/image";
import { motion } from "motion/react";
import { ServerIcon, CodeIcon, GraduationCapIcon } from "lucide-react";

const About = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/20 mb-4">
                        <GraduationCapIcon className="w-3.5 h-3.5 mr-1.5" />
                        Learning Project
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        About Image Tool
                    </h2>
                </div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/bg.webp"
                            alt="Image Tool Project"
                            fill
                            className="object-cover brightness-75"
                        />
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-6"
                >
                    <p className="text-lg text-gray-300">
                        Image Tool is a personal project developed to explore and master the integration of separate frontend 
                        and backend architectures in modern web applications.
                    </p>
                    
                    <p className="text-lg text-gray-300">
                        This application demonstrates a complete separation of concerns, with a React-based frontend 
                        communicating with a standalone backend API, showcasing real-world development patterns 
                        and best practices.
                    </p>
                    
                    <div className="pt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                            <div className="bg-gradient-to-br from-blue-950 to-purple-950 p-3 rounded-lg">
                                <ServerIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">Backend</h3>
                                <p className="text-sm text-gray-400">Node, Express, PostgreSQL</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                            <div className="bg-gradient-to-br from-blue-950 to-purple-950 p-3 rounded-lg">
                                <CodeIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">Frontend</h3>
                                <p className="text-sm text-gray-400">React & NextJS</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
