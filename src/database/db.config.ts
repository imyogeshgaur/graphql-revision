import { Sequelize } from "sequelize";
import {resolve} from "path"
import { config } from "dotenv";
config({path:resolve("./src/.env")})

const sequelize = new Sequelize(process.env.DB_URL as string);

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected Successfully !!!");
    } catch (error) {
        console.log("Error in connection : " + error)
    }
}

export default connectDb;
