const jwt = require("jsonwebtoken")
const User = require("../models/user")
require("dotenv").config()
// auth,isStudent,isAdmin

exports.auth = async (req,res,next)=>{
    try{
        const token = req.body.token || (req.cookies)?req.cookies.token:NULL || (req.header)?req.header("Authentication").replace("Bearer ",""):NULL;
        console.log(req.cookies)
        if(!token){
            return res.status(500).json({
                message:"No token included",
                success:false
            })
        }
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        } catch(err){
            res.status(500).json({
                success:false,
                message:"Error in decoding token",
                data:err.message,
            })
        }
        next();
    } catch(err){
        res.status(400).json({
            data:err.message,
            success:false,
            message:"Failed to decode token",
        })
    }
}

exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.role=="Student"){
            res.status(200).json({
                success:true,
                message:"Verified and given access to student",
                data:req.user
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"The role is not that of student",
                data:req.user
            })
        }
    }catch(err){
        res.status(401).json({
            success:false,
            message:"Failed to give authorization to user for student",
            data:err.message
        })
    }
}

exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.role=="Admin"){
            res.status(200).json({
                success:true,
                message:"Verified and given access to Admin",
                data:req.user
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"The role is not that of Admin",
                data:req.user
            })
        }
    }catch(err){
        res.status(401).json({
            success:false,
            message:"Failed to give authorization to user for student",
            data:err.message
        })
    }
}