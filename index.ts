import express, { Express} from "express";
import sequelize from "./config/database";
import dotenv from "dotenv"
import cors from "cors"; // ✅ Import kiểu ES6 nếu dùng TypeScript
import clientRouters from "./routers/clients";
import adminRouters from "./routers/admin";

dotenv.config()



sequelize

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.json());


app.use(cors()); // Mặc định cho phép tất cả origin


//ROUTER
clientRouters(app);
adminRouters(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
