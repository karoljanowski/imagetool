import axios from "axios";
import getToken from "./token";
import { File } from "./types/file";

const processFile = async (file: File) => {
    const token = await getToken();
    const formData = new FormData();

    formData.append("fileId", file.id);
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

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/process`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
export default processFile;