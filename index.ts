import express, { Express, Request, Response } from "express";
import sequelize from "./config/database";
import dotenv from "dotenv"
import Product from "./model/products.model";
dotenv.config()

sequelize

const app: Express = express();
const port: number | string = process.env.PORT || 3000;



app.get("/", async (req: Request, res: Response) => {
  const pro = await Product.findAll({ raw: true })
  console.log(pro)
  res.json(pro)
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
