import axios, { AxiosError } from "axios";
import getToken from "./token";

interface ApiResponse {
    success: boolean;
    message: string;
}

const deleteAllFiles = async () => {
    try {
        const token = await getToken();
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteAll/${token}`);
        return {
            success: response.data.success,
            message: response.data.message
        };
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        return {
            success: false,
            message: axiosError.response?.data?.message || "Failed to delete files"
        };
    }
}

const deleteFile = async (fileId: string) => {
    try {
        const token = await getToken();
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete/${token}/${fileId}`);
        return {
            success: response.data.success,
            message: response.data.message
        };
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        return {
            success: false,
            message: axiosError.response?.data?.message || "Failed to delete file"
        };
    }
}


export { deleteAllFiles, deleteFile };