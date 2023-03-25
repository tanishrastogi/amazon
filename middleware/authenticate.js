const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

// console.log(secretKey);

const authenticate = async(req,res,next)=>{

    const token = req.cookies.AmazonWeb;
    if(token!==undefined){
    try {
        // console.log("Authenticate.js line 11: "+token);
        const verifyToken = jwt.verify(token , secretKey);
        // console.log(verify);

        const rootUser = await USER.findOne({_id:verifyToken._id , "tokens.token":token})
        // console.log("Authenticate.js line 16: "+rootUser);


        if(!rootUser){throw new Error("User not found")}
        req.token = token
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } 
    catch (error) {
        res.status(401).send("Unauthorized: No token found");
        // console.log(error);
    }    
}   
else{
    // alert("please reload");[]
}
}


module.exports = authenticate;