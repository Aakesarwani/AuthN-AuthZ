import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        
    })
    .then(()=>{console.log("DB connection successful")})
    .catch((error)=>{
        console.log("Issue in db connection");
        console.error(error.message);
        process.exit(1);
    });
};

export default connectDb;