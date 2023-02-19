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

//backend api
app.get("/api", (req, res) => {
    // res.json({ "users":  ["user1", "user2", "user3", "user4"] })
    const collection = client.db("eshop").collection("products");
    const products = collection.find().toArray()
    res.json(products)
    console.log("done")
})

app.get("/api/products/", async (req, res) => {
    const collection = client.db("eshop").collection("products");
    const products = await collection.find().toArray()
    res.json(products)
})

//listen
app.listen(5000, () => {
    console.log("server started on port 5000!!")
})