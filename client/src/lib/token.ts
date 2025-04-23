import { v4 as uuidv4 } from 'uuid';

const generateToken = (): string => {
    return uuidv4();
}

const getToken = () => {
    if (typeof window === 'undefined') return '';
    
    let token = localStorage.getItem("token");
    if (!token) {
        token = generateToken();
        localStorage.setItem("token", token);
    }
    return token;
}

export default getToken;
