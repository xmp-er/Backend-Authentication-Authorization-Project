const express = require("express");
const router = express.Router();

const {signup,login} = require("../controllers/auth");
const {auth,isStudent,isAdmin} = require("../middlewares/auth");
router.post("/posts/signup",signup);
router.post("/posts/login",login);

//protected routes
router.get("/posts/student",auth,isStudent,(req,res)=>{
    res.status(200).json({
        message:"Student authorized to acccess",
        success:true
    })
})
router.get("/posts/admin",auth,isAdmin,(req,res)=>{
    res.status(200).json({
        message:"Admin authorized to acccess",
        success:true
    })
})
module.exports=router;
