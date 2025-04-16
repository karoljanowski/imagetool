import FormatOptions from "./FormatOptions";
import ManagerItem from "./ManagerItem";
import ResizeOptions from "./ResizeOptions";
import BackgroundRemovalOptions from "./BackgroundRemovalOptions";
const Manager = () => {
    return (
        <div className="fixed bottom-8 left-0 w-full">
            <div className="container mx-auto px-4 bg-white/10 backdrop-blur-md rounded-md grid grid-cols-[2fr_1fr_1fr] p-2 gap-2">
                <ManagerItem>
                    <ResizeOptions />
                </ManagerItem>
                <ManagerItem>
                    <FormatOptions />
                </ManagerItem>
                <ManagerItem>
                    <BackgroundRemovalOptions />
                </ManagerItem>
            </div>
        </div>
    )
}

export default Manager; 