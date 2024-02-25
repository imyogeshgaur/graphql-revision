import { verify, decode } from "jsonwebtoken"
import { resolve } from "path"
import { config } from "dotenv";
config({ path: resolve("./src/.env") })

const decryptUser = (token: any) => {
    const validToken = verify(token, process.env.JWT_SECRET as string)
    if (validToken) {
        const decryptedVal: any = decode(token, { complete: true })
        return decryptedVal.payload.userId
    }
}

export default decryptUser