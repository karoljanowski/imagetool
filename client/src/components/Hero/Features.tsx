import { DatabaseIcon, ScalingIcon, FileCogIcon, FullscreenIcon } from "lucide-react";

const Features = () => {
    const features = [
        {
            text: "Compress",
            icon: <DatabaseIcon strokeWidth={1} className="w-10 h-10 text-white" />
        },
        {
            text: "Resize",
            icon: <ScalingIcon strokeWidth={1} className="w-10 h-10 text-white" />
        },
        {
            text: "Convert",
            icon: <FileCogIcon strokeWidth={1} className="w-10 h-10 text-white" />
        },
        {
            text: "Background",
            icon: <FullscreenIcon strokeWidth={1} className="w-10 h-10 text-white" />
        }
    ]

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex items-start justify-center gap-24">
                {features.map((feature) => (
                    <div key={feature.text} className="flex flex-col items-center justify-center gap-2">
                        {feature.icon}
                        <span className="w-min text-center text-lg leading-none">{feature.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features;