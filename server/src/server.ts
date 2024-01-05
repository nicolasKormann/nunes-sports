import express from "express";
import productRouter from "./routes/products";

const app = express();
app.use(express.json());

const port = process.env.PORT ?? 4000;

app.use("/", productRouter);

app.listen(port, () => console.log("Server is running on port", port));
