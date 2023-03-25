const mongoose = require("mongoose");

const productsSchema2 = new mongoose.Schema({
    id:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    description:String,
    description2:String,
    description3:String,
    description4:String,
    tagline:String
})

const productsSchema = new mongoose.Schema({
    todaysDeal:Array,
    bestSellers:Array,
    products:Array,
    deal:Array
})

const Products2 = new mongoose.model("products2" , productsSchema2 );
const Products  = new mongoose.model("products" , productsSchema);


module.exports = Products;
// module.exports = Products2;