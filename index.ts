import express, { Express, Request, Response } from "express";
import sequelize from "./config/database";
import dotenv from "dotenv"
import Product from "./model/products.model";
import cors from "cors"; // ✅ Import kiểu ES6 nếu dùng TypeScript




dotenv.config()



sequelize

const app: Express = express();
const port: number | string = process.env.PORT || 3000;


app.use(cors()); // Mặc định cho phép tất cả origin



app.get("/", async (req: Request, res: Response) => {
  const pro = await Product.findAll({ raw: true })
  console.log(pro)
  res.json(pro)
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
