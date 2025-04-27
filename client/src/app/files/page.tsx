import FilesList from "@/components/Files/FilesList";
import Header from "@/components/Header";

const Files = () => {
    return (
        <main className="relative max-h-[100svh] min-h-[100svh] w-full overflow-hidden">
            <Header />
            <FilesList />
        </main>
    )
}

export default Files;