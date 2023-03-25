// const {individualItems} = require("./models/productsSchema2");
// const {} = require("./models/productsSchema2");
const Products = require("./models/productsSchema");
const { deal, bestSellers , todaysDeal , products} = require("./constant/productData1");


const defaultData = async()=>{
    try{
        await Products.deleteMany({});

        const storeData = {todaysDeal:[...todaysDeal] , bestSellers:[...bestSellers] , products:[...products] , deal:[...deal]} 
        await Products.insertMany(storeData ,function(err,result){
            
        });
        //! Since productsSchema was wrong it was ignoring all the data that I entered and was only showing _id key and its value.
        //todo --------> now that data has been stored to our DB , this data would be read inside the ./router/router.js file which would be sent to the frontend. <---------- todo//
        
    }
    catch(error){
        console.log("error : " + error);
    }
    
}


module.exports = defaultData;         // This defaultData is now imported in app.js 