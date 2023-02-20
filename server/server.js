const { MongoClient } = require('mongodb');
const express = require("express");
const { connect } = require('http2');
const app = express()

//serve static files
// app.use("/images/products", express.static("images"))
app.use(express.static("images/products"))

//mongodb connect
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

// path to admin page
app.get("/admin", (req, res) => {
  res.sendFile("admin_index.html");
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
app.get("/api/addproduct/", async (req, res) => {
    
})

//listen
app.listen(5000, () => {
    console.log("server started on port 5000")
})