import Hero from "@/components/Hero/Hero";
import Drop from "@/components/Drop";
import Header from "@/components/Header";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";

const Home = () => {
    return (
        <main className="relative min-h-[100svh] w-full overflow-hidden">
            <Drop />
            <Header /> 
            <Hero />
            <About />
            <Contact />
        </main>
    )
}


export default Home;