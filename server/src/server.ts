import express from "express";
import productRouter from "./routes/products";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT ?? 4000;

app.use("/", productRouter);

app.listen(port, () => console.log("Server is running on port", port));
