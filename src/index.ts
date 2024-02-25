import express, { json, urlencoded } from "express"
const app = express();
import connectDb from "./database/db.config";
import { ApolloServer } from "@apollo/server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { startStandaloneServer } from "@apollo/server/standalone"

app.use(json())
app.use(urlencoded({ extended: true }))
connectDb();

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server).then((resp)=>{
    console.log(`Server Running on : ${resp.url}`)
}).catch((err)=>{
    console.log(err)
})

