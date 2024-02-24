// const { mongoose } = require("mongoose");

const mongoose = require("mongoose");
// mongoose
const productsSchema2 = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: {
        shortTitle: String,
        longTitle: String
    },
    price: {
        mrp: String,
        cost: String,
        discount: String
    },
    description: String,
    description2: String,
    description3: String,
    description4: String,
    tagline: String
})

const productsSchema = new mongoose.Schema({
    todaysDeal: [productsSchema2],
    bestSellers: [productsSchema2],
    products: [productsSchema2],
    deal: [productsSchema2]
})

productsSchema.methods.addData = async()=>{
    console.log("hello world")
}

const Products = new mongoose.model("product", productsSchema);

module.exports =  Products ;