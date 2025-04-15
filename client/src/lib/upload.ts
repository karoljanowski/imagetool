import axios from "axios";
import getToken from "./token";

const upload = async (file: File) => {
    const formData = new FormData();
    const token = await getToken();
    formData.append('token', token);
    formData.append("file", file);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData);

    if (response.status !== 200) {
        throw new Error("Failed to upload file");
    }
}

export default upload;