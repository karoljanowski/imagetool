import axios from "axios";
import getToken from "./token";

const getFiles = async () => {
    const token = await getToken();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/files?token=${token}`);
    return response.data;
}

export default getFiles;