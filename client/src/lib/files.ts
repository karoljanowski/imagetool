import axios, { AxiosError } from "axios";
import getToken from "./token";
import { File } from "./types/file";

interface ApiResponse {
    success: boolean;
    message?: string;
    filesList?: File[];
}

const getFiles = async () => {
    try {
        const token = await getToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/files/${token}`);
        return {
            success: true,
            filesList: response.data.filesList
        }
    } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError<ApiResponse>;
        return {
            success: false,
            message: axiosError.response?.data?.message || "Failed to get files"
        }
    }
}

export default getFiles;