require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./db/conn");
const Products = require("./models/productsSchema");
const defaultData = require("./defaultData")
const router = require("./Routes/router");
const cookieParser = require("cookie-parser");


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser(""));

app.get("/message" , function(req,res){
    res.json();
})

app.use(router);
// console.log(a.json());
app.listen(8005 , function(){
    console.log("server is up and running");
});

defaultData();


