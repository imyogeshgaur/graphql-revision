import { DataTypes, Sequelize } from "sequelize"
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./src/.env") })

export const sequelize = new Sequelize(process.env.DB_URL as string);

const User = sequelize.define("User", {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    nameOfUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailOfUser: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressLine1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressLine2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pinCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type:DataTypes.STRING,
        defaultValue:"User",
        allowNull:false
    }
})

User.sync();

export default User;