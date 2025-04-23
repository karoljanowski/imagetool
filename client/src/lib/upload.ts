import axios from "axios";
import getToken from "./token";

const upload = async (file: File) => {
    const token = await getToken();
    const format = file.type.split("/")[1];

    // step 1: init upload
    const initFormData = new FormData();
    initFormData.append('token', token);
    initFormData.append("fileName", file.name.split(".")[0]);
    initFormData.append("format", format);

    const initUploadResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/init-upload`, initFormData);

    if (initUploadResponse.status !== 200) {
        throw new Error("Failed to initialize upload");
    }

    const uploadFormData = new FormData();
    uploadFormData.append('fileId', initUploadResponse.data.fileId);
    uploadFormData.append("file", file);

    // step 2: upload file
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, uploadFormData);

    if (response.status !== 200) {
        throw new Error("Failed to upload file");
    }
}

export default upload;