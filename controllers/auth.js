import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
export const login =async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Please fill the details correctly"
            })
        }
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User does not exists"
            })
        }
        //verify password and generate jwt token 
        const payload={
            email:user.email,
            id:user._id,
            role:user.role
        }
        if(await bcrypt.compare(password,user.password)){
            let token =jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h",});
            user.token=token;
            user.password=undefined;
            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:"User logged in successfully",
                user:user,
                token:token,
            })
        }else{
            return res.status(403).json({
                success:false,
                message:"Wrong  email or password"
            })
        }

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            errormessage:error.message
        })
    }
}
export const signup= async(req,res)=>{
    try{
        const {name, email,password, role}=req.body;

        //check if user with given email already exists
        const existingUser=await User.findOne({email});

        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User already Exists"
            })
        }
        //encrypt password and create new user
        let hashedPassword;
        try{
           hashedPassword=await bcrypt.hashSync(password, 8);
        }catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            })
        }
        const user= await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:"User created successfully",
            user:user,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}