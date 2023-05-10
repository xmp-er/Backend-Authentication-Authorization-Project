const express = require("express");
const router = express.Router();

const {signup,login} = require("../controllers/auth");

router.post("/posts/signup",signup);
router.post("/posts/login",login);
module.exports=router;