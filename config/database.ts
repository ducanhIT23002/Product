import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()


const sequelize = new Sequelize(
    process.env.DATABASE_NAME,    // "product"
    process.env.DATABASE_USERNAME, // "root"
    process.env.DATABASE_PASSWORD, // Mật khẩu của bạn
    {
        host: process.env.DATABASE_HOST,       // "shortline.proxy.rlwy.net"
        port: Number(process.env.DATABASE_PORT), // 54031
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true, // Yêu cầu SSL
                rejectUnauthorized: false
            }
        }
    }
);


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default sequelize