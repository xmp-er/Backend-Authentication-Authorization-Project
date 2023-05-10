const mongoose = require ("mongoose")

require("dotenv").config()
const dbConnect = ()=>{
     mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
     })
     .then(()=>{
        console.log("DB connected succesfully")
     }).catch( (err)=>{
        console.log("DB Connection issues")
        console.log(err);
        process.exit(1);
     } )
}
module.exports=dbConnect;
