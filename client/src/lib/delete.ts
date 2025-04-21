import axios from "axios";
import getToken from "./token";

const deleteAllFiles = async () => {
    const token = await getToken();
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteAll/${token}`);
    return response.data;
}

export default deleteAllFiles;