import { ImagePlusIcon, Repeat2Icon, BoxIcon, ArrowUpRightIcon } from "lucide-react";

const HeroTop = () => {
    return (
        <div className="flex items-center justify-between gap-2">
            <HeroText />
            <Adventages />
        </div>
    )
}
const HeroText = () => {
    return (
        <div className="flex flex-col justify-center gap-2 w-1/2">
            <h1 className="text-7xl font-light uppercase gap-6">Fast, simple<br/> powerful <ImagePlusIcon strokeWidth={1} className="inline-block mb-1 w-16 h-16" /> tool</h1>
            <p className="text-xl font-light uppercase text-gray-400 flex items-center gap-4">All you need to do is upload your image and we'll handle the rest</p>
        </div>
    )
}

const Adventages = () => {
    return (
        <div className="flex w-1/2 h-full justify-end gap-4">
            <div className="w-36 h-36 border-2 border-white rounded-full flex flex-col items-center justify-center p-4 gap-2">
                <Repeat2Icon strokeWidth={1} className="w-12 h-12 text-white" />
                <p className="text-sm uppercase text-center leading-none">4 operations on go</p>
            </div>
            <div className="w-36 h-36 border-2 border-white rounded-full flex flex-col items-center justify-center p-4 gap-2">
                <BoxIcon strokeWidth={1} className="w-12 h-12 text-white" />
                <p className="text-sm uppercase text-center leading-none">No image limits</p>
            </div>
            <div className="w-36 h-36 border-2 border-white rounded-full">
                <ArrowUpRightIcon strokeWidth={0.5} className="w-36 h-36 text-white" />
            </div>

        </div>
    )
}

export default HeroTop;