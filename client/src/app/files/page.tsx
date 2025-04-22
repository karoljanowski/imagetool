import Background from "@/components/Background";
import Drop from "@/components/Drop";
import FilesList from "@/components/Files/FilesList";
import Header from "@/components/Header";
import Hero from "@/components/Hero/Hero";

const Files = () => {
    return (
        <main className="relative max-h-[100svh] min-h-[100svh] w-full overflow-hidden">
            <Drop />
            <Header />
            <FilesList />
        </main>
    )
}

export default Files;