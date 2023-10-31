import express from "express";
import "reflect-metadata";
import cors from "cors";
import { dataSource } from "./config/db";
import adController from "./controllers/ad.controller";
import categoryController from "./controllers/category.controller";

const app = express();

const port: number = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/ad", adController);
app.use("/category", categoryController);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server launch on http://localhost:${port}`);
});
