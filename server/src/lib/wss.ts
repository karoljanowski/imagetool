import { wss } from "../server";
import { WebSocket } from "ws";

export const sendMessageToAllClients = (type: string, token?: string) => {
    const data: {type: string, token?: string} = {type}

    if (token) {
        data.token = token;
    }

    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}