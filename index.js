import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import auth from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT;

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",auth);

app.listen(port,()=>{
    console.log(`App running successfully on port ${port}`);
});
connectDb();