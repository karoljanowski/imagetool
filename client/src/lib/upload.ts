import axios from "axios";
import getToken from "./token";
import { toast } from "sonner"; 

const upload = async (file: File) => {
    try {
        const token = await getToken();
        const format = file.type.split("/")[1];

        toast.info("Upload started");

        if (!['jpeg', 'png', 'webp', 'avif'].includes(format)) {
            throw new Error("Invalid file format");
        }

        // step 1: init upload
        const initFormData = new FormData();
        initFormData.append('token', token);
        initFormData.append("fileName", file.name.split(".")[0]);
        initFormData.append("format", format);

        const initUploadResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/init-upload`, initFormData)
        .catch(() => {
            throw new Error("Failed to initialize upload");
        });


        const uploadFormData = new FormData();
        uploadFormData.append('fileId', initUploadResponse.data.fileId);
        uploadFormData.append("file", file);

        // step 2: upload file
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, uploadFormData)
        .catch(() => {
            throw new Error("Failed to upload file");
        });
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("Failed to upload file");
        }
    }
}

export default upload;