const bcrypt = require("bcrypt")
const User = require("../models/user");
const jwt = require("jsonwebtoken")
require("dotenv").config();
exports.signup = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const ismailexists = await User.findOne({email});
        if(ismailexists){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            })
        }
        let hashedPass;
        try{
            hashedPass = await bcrypt.hash(password,10);
        }catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in encrypting password",
                data:err.message
            })
        }
        const user = await User.create({name,email,password:hashedPass,role})
        return res.status(200).json({
            success:true,
            message:"User entered in database",
            data:user
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"Faile to User enter in database",
            data:err.message,
        })
    }
}

exports.login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(401).json({
            success:false,
            message:"Please enter all the fields"
        })
    }
    let user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            success:false,
            message:"Please sign up first"
        })
    }
    const payload = {
        email:email,
        user:user._id,
        role:user.role
    }
    if(await bcrypt.compare(password,user.password)){
        let token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        user = user.toObject();
        user.token=token;
        user.password=undefined;
        const options = {
            expires: new Date(Date.now()+3*24*3600*1000),
            httpOnly:true
        }
        res.cookie("architscookie",token,options).status(200).json({
            success:true,
            user:user,
            message:"User authenticated,sending a cookie with the same token",
            token:token,
        })
    }else{
        res.send(401).json({
            success:false,
            message:"Wrong password"
        })
    }
}