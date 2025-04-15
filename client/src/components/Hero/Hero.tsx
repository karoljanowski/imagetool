import HeroTop from "./HeroTop";
import DropImage from "./DropImage";
import Features from "./Features";

const Hero = () => {
    return (
        <div className="container mx-auto px-4 h-[calc(100svh-4rem)] flex flex-col gap-16 justify-center">
            <HeroTop />
            <DropImage />
            <Features />
        </div>
    )
}

export default Hero;