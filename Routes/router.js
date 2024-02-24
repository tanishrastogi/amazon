const express = require("express");
// const { products } = require("../constant/productData1");

const router = express.Router();
const Products  = require("../models/productsSchema.cjs");

const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const { deal, bestSellers, todaysDeal, products1 } = require("../constant/productData1");

// const app = express();

var a = "";



router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find({});      //todo --------> This data is fetched inside frontend in the ../../amazon/src/components/redux/actions/action.js file <-------- todo//
        res.send(productsdata);
    }
    catch (error) {
        console.log("error" + error.message);
    }
})

// app.use("/api", router);

router.get("/getProducts/:productInfo/:id", async (req, res) => {
    try {

        const data = await Products.find({});
        const productInfo = req.params.productInfo;

        // console.log(productInfo);
        const lengthOfArray = data[0][productInfo].length;
        // console.log(lengthOfArray);
        let individiualData = {};
        for (let i = 0; i < lengthOfArray; i++) {
            if (data[0][productInfo][i]["id"] === req.params.id) {
                individiualData = (data[0][productInfo][i]);
                // console.log("`   hello");
                break;
            }

        }
        res.status(201).json(individiualData);
    }

    catch (error) {
        console.log("error: " + error.message);
    }
})

router.post("/register", async (req, res) => {
    // console.log(req.body); 
    const { fName, email, mobile, password, cpassword } = req.body;


    if (!fName || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "fill all the data" });
    }
    else {
        try {
            const preUserEmail = await USER.findOne({ email: email });
            const preUserMobile = await USER.findOne({ mobile: mobile });
            if (preUserEmail) {
                res.status(422).json({ error: "Email already in use" });
            }
            else if (preUserMobile) {
                res.status(422).json({ error: "Phone number already in use " });
            }
            else if (password !== cpassword) {
                res.status(422).json({ error: "confirm password and password does not match" });
            }
            else {
                const finalUser = new USER({
                    fName, email, mobile, password, cpassword
                });

                const storedData = await finalUser.save();
                console.log(storedData);
                res.status(201).json(storedData);
            }
        }
        catch (error) {
            res.send("error: " + error.message)
        }

    }

})



//todo --------> Login Page Section <--------todo//

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Fill all details" })
    }
    else {
        try {
            const userLogin = await USER.findOne({ email: email });       //Finding the user using email
            // console.log(userLogin);
            if (userLogin) {                                              // Checking if the password entered matches the password stored in database            
                const isMatch = await bcrypt.compare(password, userLogin.password);
                const token = await userLogin.generateAuthToken();
                // console.log("router.js line: 106"+token);

                res.cookie("AmazonWeb", token, {
                    expires: new Date(Date.now() + 90000),
                    httpOnly: true
                })


                // console.log(isMatch);
                if (!isMatch) {
                    res.status(400).json({ error: "Incorrect Password" })
                }
                else {
                    a = email;
                    res.status(201).json(userLogin);
                }
            }
            else if (!userLogin) {
                res.status(400).json({ error: "There is no user with this email" })
            }
        }
        catch (error) {

        }
    }
})



router.post("/addcart/:branch/:id", authenticate, async (req, res) => {
    try {
        const { branch, id } = req.params;
        const list = await Products.find();
        let cart = [];
        // console.log();    
        for (let i = 0; i < list[0][branch].length; i++) {
            // console.log(list[0][branch][i]["id"]);
            if (list[0][branch][i]["id"] === id) {
                cart = list[0][branch][i];
                break;


            }
        }
        // console.log(cart);

        const UserContact = await USER.findOne({ _id: req.userID });
        // console.log(UserContact);

        if (UserContact) {
            const cartData = await UserContact.addcartdata(cart);
            UserContact.save();
            // console.log("router.js line 154: "+cartData);
            res.status(201).json(UserContact);
        }
        else {
            res.status(401).json({ error: "invalid user" })
        }

    }
    catch (error) {
        console.log(error);
    }
})

router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID })
        res.status(201).json(buyuser);
    }
    catch (error) {
        console.log("router.js line 175: error: " + error);
    }
})



router.get("/validUser", authenticate, async (req, res) => {
    try {
        const validuser = await USER.findOne({ _id: req.userID })
        res.status(201).json(validuser);
    }
    catch (error) {
        console.log("router.js line 187 error: " + error);
    }
})


router.delete("/remove/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
            return cruval.id != id;
        })

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item removed");
    }
    catch (error) {
        console.log("error: " + error);
        res.status(400).json(req.rootUser);

    }
})

router.get('/addData', async (req, res) => {
    try {
        const storeData = { todaysDeal, bestSellers, products:products1, deal }
        const keys = Object.keys(storeData);
        // console.log(product)
        // await product.addData();
        console.log(keys)
        const obj = {}
        const product = new Products()
        keys.map(async(key)=>{
            // obj[key] = storeData[key]
            // product.push(storeData[key])
            product[key] = storeData[key]
        })
        await product.save();
        
        // keys.map(async(key)=>{
        //     // obj[key] = storeData[key]
        //     // product.push(storeData[key])
        //     const product = new Products(storeData[key])
        //     // product[key] = storeData[key]
        //     const pr = await product.save();
        // })
        
        const product1 = await Products.find({})
        
        
        res.json({message:"products updated" , data:product1})
    }
    catch (err) {
        console.log(err);
    }
})


router.get("/logout", authenticate, (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curElement) => {
            return curElement.token !== req.token;
        })

        res.clearCookie("AmazonWeb", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logged out");
    }
    catch (error) {
        console.log("error in the /logout route: " + error);
    }
})


module.exports = router;

