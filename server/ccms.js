const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user1:user1@cluster0.uqzmjre.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("eshop").collection("products");

    var obj = { productID: "count", ProductTitle: "matyas" }
    collection.insertOne(obj)

    //console.log("count: " + count)
    console.log("y")
    client.close();
});
console.log("end");