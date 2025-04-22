import axios from "axios";
import getToken from "./token";

interface ProcessFileProps {
    fileId: string;
    width: number;
    height: number;
    format: string;
    compress: boolean;
    removeBackground: boolean;
}

const processFile = async ({fileId, width, height, format, compress, removeBackground}: ProcessFileProps) => {
    const token = await getToken();
    const formData = new FormData();

    formData.append("fileId", fileId);
    formData.append("width", width.toString());
    formData.append("height", height.toString());
    formData.append("format", format);
    formData.append("compress", compress.toString());
    formData.append("removeBackground", removeBackground.toString());

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/process`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
export default processFile;