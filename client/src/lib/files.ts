import axios from "axios";
import getToken from "./token";

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
        return {
            success: false,
            message: "Failed to get files"
        }
    }
}

export default getFiles;