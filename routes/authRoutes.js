import express from "express";
import { login, signup } from "../controllers/auth.js";
import { auth, isStudent, isAdmin} from "../middlewares/auth.js"

const router=express.Router();

router.post("/login",login);
router.post("/signup",signup);

//protected Route
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected Route for Students",
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected Route for Admin",
    })
})

export default router;