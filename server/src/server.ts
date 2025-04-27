import express, { Express } from "express";
import uploadRoutes from "./routes/upload";
import getFilesRoutes from "./routes/files";
import processRoutes from "./routes/process";
import deleteRoutes from "./routes/delete";
import downloadRoutes from "./routes/download";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use("/api", uploadRoutes);
app.use("/api", getFilesRoutes);
app.use("/api", processRoutes);
app.use("/api", deleteRoutes);
app.use("/api", downloadRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});