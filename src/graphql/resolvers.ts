import { hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { resolve } from "path"
import { config } from "dotenv";
import User from "../model/User";
import { v1 } from "uuid";
import authenticate from "../middleware/Authenticate";
config({ path: resolve("./src/.env") })

const resolvers = {
    Query: {
        getAllUsers: async (_: any, { userInput }: any) => {
            try {
                const { status, message, data } = authenticate(userInput);
                if (data) {
                    const allUsers = await User.findAll({
                        where: { role: "User" },
                        attributes: [
                            "nameOfUser",
                            "emailOfUser",
                            "phoneNumber"
                        ]
                    })
                    return { status: 200, data: allUsers }
                } else {
                    return { status, message }
                }
            } catch (error) {
                console.log("Resolver Error : ", error);
                return { status: 500, message: "Internal Server Error !!!" }
            }
        }
    },
    Mutation: {
        signUpUser: async (_: any, { userInput }: any) => {
            try {
                const emailOfUser = userInput.emailOfUser;
                const phoneNumber = userInput.phoneNumber;
                const password = userInput.password;
                const isEmailExist = await User.findOne({ where: { emailOfUser } })
                const isPhoneExist = await User.findOne({ where: { phoneNumber } })
                if (!isEmailExist || !isPhoneExist) {
                    const hashedPassword = await hash(password, 12);
                    const userId = v1();
                    const newUser = await User.create({
                        userId,
                        ...userInput,
                        password: hashedPassword
                    })
                    return { status: 200, data: newUser.dataValues, message: "User Registered Successfully !!!" }
                } else {
                    return { status: 401, message: "User Already Exist !!!" }
                }
            } catch (error) {
                console.log("Resolver Error : ", error);
                return { status: 500, message: "Internal Server Error !!!" }
            }
        },
        loginUserWithEmail: async (_: any, { userInput }: any) => {
            try {
                const emailOfUser = userInput.emailOfUser;
                const password = userInput.password;
                const isEmailExist: any = await User.findOne({ where: { emailOfUser } })
                if (isEmailExist) {
                    const match = await compare(password, isEmailExist.password)
                    if (match) {
                        const tokenToSend = sign(
                            { userId: isEmailExist.dataValues.userId },
                            process.env.JWT_SECRET as string
                        )
                        return { status: 200, data: tokenToSend, message: "Login Successful !!!" }
                    } else {
                        return { status: 401, message: "Invalid Credentials !!!" }
                    }
                } else {
                    return { status: 401, message: "Invalid Credentials !!!" }
                }
            } catch (error) {
                console.log("Resolver Error : ", error);
                return { status: 500, message: "Internal Server Error !!!" }
            }
        },
        loginUserWithPhone: async (_: any, { userInput }: any) => {
            try {
                const phoneNumber = userInput.phoneNumber;
                const password = userInput.password;
                const isPhoneExist: any = await User.findOne({ where: { phoneNumber } })
                if (isPhoneExist) {
                    const match = await compare(password, isPhoneExist.password)
                    if (match) {
                        const tokenToSend = sign(
                            { userId: isPhoneExist.dataValues.userId },
                            process.env.JWT_SECRET as string
                        )
                        return { status: 200, data: tokenToSend, message: "Login Successful !!!" }
                    } else {
                        return { status: 401, message: "Invalid Credentials !!!" }
                    }
                } else {
                    return { status: 401, message: "Invalid Credentials !!!" }
                }
            } catch (error) {
                console.log("Resolver Error : ", error);
                return { status: 500, message: "Internal Server Error !!!" }
            }
        }
    }
}

export default resolvers;