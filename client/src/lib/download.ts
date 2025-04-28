import axios from "axios";
import { toast } from "sonner";

const donwloadSingleFile = async (token: string, fileId: string, processedFormat: string, name: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/processedFile/${token}/${fileId}.${processedFormat}`, {
        responseType: 'blob'
    })
    .catch((error) => {
        toast.error(error.message);
        return;
    });

    if (!response) return;

    const blob = response.data;
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.${processedFormat}`;
    a.click();
    URL.revokeObjectURL(url);
}

const downloadAllFiles = async (token: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/downloadAll/${token}`, {
            responseType: 'blob'
        })
        if (!response) return;
    
        const blob = response.data;
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = `images.zip`;
        a.click();
        URL.revokeObjectURL(url);
    } catch {
        toast.error("Error downloading files");
    }
}

export { donwloadSingleFile, downloadAllFiles };
