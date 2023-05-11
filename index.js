const express = require("express") 
const app =express();

require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();

const cookieParser = require("cookie-parser")
app.use(cookieParser()) //cookie-parser middleware added.

const user = require("./routes/user")
app.use("/api/v1",user);

app.listen(port,()=>{
    console.log(`app is listening at ${port}`)
})