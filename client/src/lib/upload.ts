import axios, { AxiosError } from "axios";
import getToken from "./token";
import { toast } from "sonner"; 
import { v4 as uuidv4 } from "uuid";
import { File as FileType } from "./types/file";

interface ApiResponse {
    success: boolean;
    message: string;
}

const upload = async (fileObj: globalThis.File, addFileToContext: (file: FileType) => void, fetchFiles?: () => void) => {
    try {
        const token = getToken();
        const format = fileObj.type.split("/")[1];

        toast.info("Upload started");

        if (!['jpeg', 'png', 'webp', 'avif'].includes(format)) {
            throw new Error("Invalid file format");
        }

        if (addFileToContext) {
            const newFile: FileType = {
                id: uuidv4(),
                token,
                name: fileObj.name.split(".")[0],
                url: URL.createObjectURL(fileObj),
                status: 'UPLOADING',
                size: fileObj.size,
                originalFormat: format
            };
            
            addFileToContext(newFile);
        }

        const uploadFormData = new FormData();
        uploadFormData.append('token', token);
        uploadFormData.append("fileName", fileObj.name.split(".")[0]);
        uploadFormData.append("format", format);
        uploadFormData.append("file", fileObj);

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, uploadFormData)
        .then(() => {
            if (fetchFiles) {
                fetchFiles();
            }
            toast.success("File uploaded successfully");
        })
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data?.message || "Failed to upload file");
        if (fetchFiles) {
            fetchFiles();
        }
    }
}

export default upload;