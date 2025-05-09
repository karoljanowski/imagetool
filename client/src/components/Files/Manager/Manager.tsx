import FormatOptions from "./FormatOptions";
import ManagerItem from "./ManagerItem";
import ResizeOptions from "./ResizeOptions";
import OtherOptions from "./OtherOptions";
import ActionButtons from "./ActionButtons";
import { forwardRef, ForwardedRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const Manager = forwardRef(({}, ref: ForwardedRef<HTMLDivElement>) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("resize");

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Check on initial load
        checkIfMobile();
        
        // Add event listener for resize
        window.addEventListener("resize", checkIfMobile);
        
        // Clean up
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const tabs = [
        { id: "resize", label: "Resize", component: <ResizeOptions /> },
        { id: "format", label: "Format", component: <FormatOptions /> },
        { id: "other", label: "Other", component: <OtherOptions /> },
        { id: "actions", label: "Actions", component: <ActionButtons /> }
    ];

    return (
        <div ref={ref} className="fixed bottom-2 md:bottom-8 left-0 w-full z-10 px-2">
            <div className="container mx-auto px-1 md:px-4 bg-neutral-900/90 border border-neutral-800/50 backdrop-blur-md rounded-md">
            
                {isMobile && (
                    <div className="flex flex-col p-2">
                        <Button variant="secondary" size="sm" onClick={() => setIsCollapsed(prev => !prev)}>
                            Options & Actions <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
                        </Button>
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="flex mb-2 border-b border-neutral-800">
                                        {tabs.map(tab => (
                                            <button
                                            key={tab.id}
                                            className={`px-4 py-2 text-sm ${activeTab === tab.id ? 'text-white border-b-2 border-white' : 'text-neutral-400'}`}
                                            onClick={() => setActiveTab(tab.id)}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                    {tabs.find(tab => tab.id === activeTab)?.component}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
                {!isMobile && <DesktopManager />}
            </div>
        </div>
    );
});

const DesktopManager = () => {
    return (
        <div className="grid grid-cols-[2fr_1fr_1fr_auto] p-2 gap-4">
            <ManagerItem>
                <ResizeOptions />
            </ManagerItem>
            <ManagerItem>
                <FormatOptions />
            </ManagerItem>
            <ManagerItem>
                <OtherOptions />
            </ManagerItem>
            <ManagerItem>
                <ActionButtons />
            </ManagerItem>
        </div>
    )
}
Manager.displayName = "Manager";

export default Manager;