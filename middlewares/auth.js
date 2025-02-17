import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth =(req,res,next)=>{
    try{
        //extract  jwt token 
        const token=req.body.token||req.cookies.token || req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }

        //verify the token
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            req.user=payload;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the token"
        })
    }
}

export const isStudent = (req,res,next)=>{
    try{
        if(req.user.role!="Student"){
            return res.status(401).json({
                success:false,
                message:"Not Allowed.This is a protected route for students"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while verifying the student"
        })
    }
}

export const isAdmin= (req,res,next)=>{
    try{
        if(req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                message:"Not Allowed.This is a protected route for admin"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while verifying the admin"
        })
    }
}