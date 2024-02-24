require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./db/conn");
// const Products = require("./models/productsSchema");
// const defaultData = require("./defaultData")
const router = require("./Routes/router");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT 


const app = express();
app.use(cors({
    origin:"https://amazon0054a.netlify.app",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser(""));

app.get("/message" , function(req,res){
    res.json();
})

app.use(router);
// console.log(a.json());
app.listen(PORT || 8005 , function(){
    console.log("server is up and running");
});

// defaultData();


