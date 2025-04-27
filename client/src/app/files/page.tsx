import Drop from "@/components/Drop";
import FilesList from "@/components/Files/FilesList";
import Header from "@/components/Header";
import { FileProvider } from "@/lib/context/FileContext";

const Files = () => {
    return (
        <FileProvider>
            <main className="relative max-h-[100svh] min-h-[100svh] w-full overflow-hidden">
                <Drop />
                <Header />
                <FilesList />
            </main>
        </FileProvider>
    )
}

export default Files;