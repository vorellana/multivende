import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRouter from "./routes/productRoutes.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-api-key"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, HEAD"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/products", productRouter);
app.get("/test", async (res, req) => {
  req.status(200).json({
    message: "Test",
  });
});

export default app;
