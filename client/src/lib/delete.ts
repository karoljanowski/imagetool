import axios, { AxiosError } from "axios";
import getToken from "./token";
import { toast } from "sonner";

interface ApiResponse {
    success: boolean;
    message: string;
}

const deleteAllFiles = async (fetchFiles: () => void) => {
    try {
        const token = await getToken();
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteAll/${token}`);
        fetchFiles();
        toast.success(response.data.message);
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data?.message || "Failed to delete files");
    }
}

const deleteFile = async (fileId: string, fetchFiles: () => void) => {
    try {
        const token = await getToken();
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete/${token}/${fileId}`);
        fetchFiles();
        toast.success(response.data.message);
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data?.message || "Failed to delete file");
    }
}


export { deleteAllFiles, deleteFile };