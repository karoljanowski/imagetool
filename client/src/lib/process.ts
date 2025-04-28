import axios, { AxiosError } from "axios";
import getToken from "./token";
import { File, FileStatus } from "./types/file";
import { toast } from "sonner";

interface ApiResponse {
    success: boolean;
    message: string;
}

const processFile = async (file: File, setStatus: (fileId: string, status: FileStatus) => void, fetchFiles: () => void) => {
    const token = await getToken();
    const formData = new FormData();

    setStatus(file.id, "PROCESSING");

    formData.append("fileId", file.id);
    formData.append("token", token);
    if (file.processedWidth) {
        formData.append("newWidth", file.processedWidth.toString());
    }
    if (file.processedHeight) {
        formData.append("newHeight", file.processedHeight.toString());
    }
    if (file.processedFormat) {
        formData.append("newFormat", file.processedFormat);
    }
    if (file.processedCompressed) {
        formData.append("compress", file.processedCompressed.toString());
    }
    if (file.processedRemovedBackground) {
        formData.append("removeBackground", file.processedRemovedBackground.toString());
    }

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/process`, formData)
        .then(() => {
            fetchFiles();
        })
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data?.message || "Failed to process file");
        fetchFiles();
    }
}
export default processFile;