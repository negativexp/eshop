const { MongoClient } = require('mongodb');
const express = require("express");
const { connect } = require('http2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express()

app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "..", "app", "build", "static")));

// mongodb connect
const uri = "mongodb+srv://user1:user1@cluster0.uqzmjre.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function connectToMongoDB() {
    await client.connect()
    console.log("MongoDB connected!")
}
connectToMongoDB()

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


// api endpoint that returns all products from database
app.get("/api/products/", async (req, res) => {
    const collection = client.db("eshop").collection("products");
    const products = await collection.find().toArray()
    res.json(products)
})

// api endpoint that returns all categories from database
app.get("/api/categories/", async (req, res) => {
    const collection = client.db("eshop").collection("categories");
    const categories = await collection.find().toArray()
    res.json(categories)
})

// TODO: get request from admin_index and add it to database
app.post("/api/addproduct/", async (req, res) => {
    console.log(req.body.productdata);
})

// listen
app.listen(5000, () => {
    console.log("server started on port 5000")
})