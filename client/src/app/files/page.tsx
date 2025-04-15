import Background from "@/components/Background";
import Drop from "@/components/Drop";
import FilesList from "@/components/Files/FilesList";
import Hero from "@/components/Hero/Hero";

const Files = () => {
    return (
        <main className="relative min-h-[100svh] w-full overflow-hidden">
            <Drop />
            <FilesList />
        </main>
    )
}

export default Files;