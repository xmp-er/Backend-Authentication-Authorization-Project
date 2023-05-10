const bcrypt = require("bcrypt")
const User = require("../models/user");

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