import { verify } from "jsonwebtoken"
import decryptUser from "../utils/decryptUser";

const authenticate = (token:any) => {
    try {
        if (!token) {
            return { status: 401, message: "Not Authorized !!!" }
        } else {
            const userId  = decryptUser(token);
            return { status: 200, data: userId, message: "Authorized !!!" }
        }
    } catch (error) {
        console.log(error)
        return { status: 401, message: "Not Authorized !!!" }
    }
}

export default authenticate