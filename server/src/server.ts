import express, { Express } from "express";
import uploadRoutes from "./routes/upload";
import getFilesRoutes from "./routes/files";
import cors from "cors";
import { WebSocketServer } from 'ws';
import http from 'http';

const app: Express = express();
const port = process.env.PORT;
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

app.use(cors());
app.use("/api", uploadRoutes);
app.use("/api", getFilesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Export WebSocket server instance
export { wss };

// Listen on server instead of app
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});