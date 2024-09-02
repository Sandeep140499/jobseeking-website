import express from "express" ;
import dotenv from "dotenv";
import cors from "cors";   //to connected with UI or we can connect multiple frontend 
import cookieParser from "cookie-parser"; // help to maintain cookies on website for user for authorization 
import fileUpload from "express-fileupload";  //to upload documents pdf , png , images on cloude
import applicationRouter from "./router/applicationRouter.js";
import jobRouter from "./router/jobRouter.js";
import userRouter from "./router/userRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";


const app = express()
dotenv.config({path: "./config/config.env"}); //to connect port 

app.use(cors({
    origin: [process.env.FRONTEND_URL], //ORIGIN : to help connection with frontend 
    methods: ["GET" , "POST" , "DELETE" , "PUT"], // Methord : it help to work on given methords we can give methords
    credentials: true ,                    // Credentials : it help to authonicated with user and tokens 
}))

//cookie parser always use before use express app.use(express.json())   
app.use(cookieParser())

app.use(express.json())       //it help to paras only json data and other negelct 
app.use(express.urlencoded({extended: true}))  // it help to convert strings into json data 

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))

//define router what we want 
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/job' , jobRouter)
app.use('/api/v1/application' , applicationRouter)

//we don't not use like middleware it is always after middleware
dbConnection();

//to find out errors in form when if we get error
app.use(errorMiddleware);   

export default app;

