import { useState } from "react";
import HeroTop from "./HeroTop";
import DropImage from "./DropImage";
import Features from "./Features";
import Image from "next/image";

const Hero = () => {
    return (
        <div className="container mx-auto px-4 pt-10 pb-16 min-h-[calc(100svh-4rem)]">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
                <HeroTop />
                <DropImage />
            </div>
            
            <div className="mt-16 lg:mt-24">
                <Features />
            </div>
        </div>
    )
}

export default Hero;