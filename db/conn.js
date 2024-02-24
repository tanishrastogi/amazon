require('dotenv').config()
const mongoose = require("mongoose");

const DB = process.env.DB; 
// console.log(DB);
mongoose.set("strictQuery" , false);
mongoose.connect(DB).then(()=>{console.log("Database Connected");}).catch((error)=>{console.log(error.message);})