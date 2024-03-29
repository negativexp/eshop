const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const express = require("express");
const { connect } = require('http2');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors")
const app = express()

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "..", "app", "build", "static")));
app.use("/images", express.static("images"))
app.set('view engine', 'ejs');

// mongodb connect
const uri = "mongodb+srv://user1:user1@cluster0.uqzmjre.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function connectToMongoDB() {
    try {
        await client.connect()
        console.log("[+] MongoDB connected")
    } catch (error) {
        console.log("[-] MongoDB NOT connected!")
    }
}
connectToMongoDB()

// ======================== PAGE ROUTES ========================
// default path
app.get("/", (req, res) => {
    const currentPath = path.join(__dirname, '../app/build/');
    res.sendFile(currentPath + "/index.html");
});

// path to admin dashboard
app.get("/admin", (req, res) => {
    const currentPath = path.join(__dirname, '/admin/');
    res.sendFile(currentPath + "dashboard.html");
});

// path to page for adding products into DB
app.get("/productform", (req, res) => {
    const currentPath = path.join(__dirname, '/admin/');
    res.sendFile(currentPath + "product_form.html");
});

// path to all orders page
app.get("/ordersform", (req, res) => {
    const currentPath = path.join(__dirname, '/admin/');
    res.sendFile(currentPath + "orders.html");
});


// ======================== API ROUTES ========================
// api endpoint that returns all products from database
app.get("/api/products/", async (req, res) => {
    const collection = client.db("eshop").collection("products");
    const products = await collection.find().toArray()
    res.json(products)
});

// api endpoint that returns all categories from database
app.get("/api/categories/", async (req, res) => {
    const collection = client.db("eshop").collection("categories");
    const categories = await collection.find().toArray()
    res.json(categories)
});

// api to get all orders
app.get("/api/orders/", async (req, res) => {
    const collection = client.db("eshop").collection("orders");
    const orders = await collection.find().toArray();
    res.json(orders);
});

// api endpoint to find order with specific id in DB
app.get("/api/order/:id", async (req, res) => {
    const id = new ObjectId(req.params.id);
    const collection = client.db("eshop").collection("orders");
    collection.findOne({_id: id}).then((order) => {
        res.render('orderlookup', { order: order });
    });
});

// api endpoint to add products into database
app.post("/api/addproduct/", async (req, res) => {
    
    const collection = client.db("eshop").collection("products");
    const productCount = await (await collection.countDocuments()).toString().padStart(6, "0")
    req.body.productdata.productID = productCount

    const image64 = req.body.productdata.image64

    const base64Data = image64.replace(/^data:image\/jpeg;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const filename = `${req.body.productdata.productID}.jpg`;
    fs.writeFileSync("images/products/"+filename, imageBuffer);

    const productData = req.body.productdata;
    delete productData.image64;

    await collection.insertOne(req.body.productdata);
    console.log("[+] Product added")
    res.status(200).send("");
});

// api endpoint to add an order into database
app.post("/api/addorder/", async (req, res) => {
    const collection = client.db("eshop").collection("orders");
    const collectionProducts = client.db("eshop").collection("products");
    // TODO: add order into DB - DONE
    // TODO: make the cart in orderdata simpler - DONE
    // TODO: calculate product quantity after purchase - DONE
    var tempArr = []
    req.body.orderdata.cart.forEach(element => {
        tempArr.push({_id: element._id, productID: element.productID, cartQuantity: element.cartQuantity, title: element.title})
        const query = { _id: new ObjectId(element._id) };
        const update = { $set: { quantity: element.quantity - element.cartQuantity} };
        collectionProducts.updateOne(query, update);
    });
    req.body.orderdata.cart = tempArr

    await collection.insertOne(req.body.orderdata)


    res.status(200).send("");
});

// api endpoint to edit and order
app.post("/api/editorder/", async (req, res) => {
    const collection = client.db("eshop").collection("orders");
    const id = new ObjectId(req.body.orderdata._id);

    // now we dont need _id object so we delete it & update DB
    delete req.body.orderdata._id;
    await collection.updateOne(
        { _id: id },
        { $set: req.body.orderdata }
    );

    res.status(200).send("");
});  

// listen
app.listen(5000, () => {
    console.log("[+] Server started on port 5000")
});