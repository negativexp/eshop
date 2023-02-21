const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user1:user1@cluster0.uqzmjre.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri)

async function MongoDeleteAll() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    
        const collection = client.db("eshop").collection("categories")
        const result = await collection.deleteMany({});
        console.log(`${result.deletedCount} documents deleted`);
    
      } catch (err) {
        console.error(err);
      } finally {
        await client.close();
      }
}

async function MongoInsertObject() {
    try {
        await client.connect()
        console.log('Connected to MongoDB Atlas')

        const collection = client.db("eshop").collection("products")
        const categories = client.db("eshop").collection("categories")
        categories.find().forEach(function(doc) {
            console.log(doc.subCategories);
          }, function(err) {
            if (err) {
              console.log(err);
            }
          });
        
        const count = await collection.countDocuments()



        const product = {
            productTitle: "item-title #" + count,
            productShortDescription: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat.",
            productCategory: categories[0],
            productID: count
        };
  
        const result = await collection.insertOne(product)
        console.log("1 product inserted")
        
        } catch (err) {
            console.error(err)
        } finally {
            await client.close()
    }
}

async function test() {
  try {
    await client.connect()
    console.log('Connected to MongoDB Atlas')

    const collection = client.db("eshop").collection("products")
    const categories = client.db("eshop").collection("categories")
    const test = await categories.find({},{"subCategories": 1}).toArray()
    console.log(test)
    // categories.find().forEach(function(doc) {
    //     console.log(doc.subCategories);
    //   }, function(err) {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });


    
    const count = await collection.countDocuments()

    const product = {
        productTitle: "item-title #" + count,
        productShortDescription: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat.",
        productCategory: "bruh",
        productSubcategory: "bruh",
        productID: count
    };

    // console.log(product)

    // const result = await collection.insertOne(product)
    console.log("1 product inserted")
    
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
}
}

async function MongoInsertCategory() {
    try {
        await client.connect()
        console.log('Connected to MongoDB Atlas')

        const collection = client.db("eshop").collection("categories")
        const count = await collection.countDocuments()

        const category = {
            category: "garden",
            subCategories: ["Sekačky", "Skleníky", "Brusky"]
            // electronics: ["CPU", "GPU", "Herní konzole"],
            // sport: ["Zimní", "Fitness", "Výživa"],
            // house: ["Mopy", "Pánve", "Prášky na praní"],
            // garden: ["Sekačky", "Skleníky", "Brusky"]
        };
  
        const result = await collection.insertOne(category)
        console.log("1 product inserted")
        
        } catch (err) {
            console.error(err)
        } finally {
            await client.close()
    }
}

async function deleteObjectsByCondition() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
  
      const collection = client.db("eshop").collection("products");
  
      const query = { productID: 2 };
      const result = await collection.deleteOne(query);
  
      console.log(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
}

test().catch(console.dir)
//MongoInsertCategory().catch(console.dir)
//MongoDeleteAll().catch(console.dir);
//MongoInsertObject().catch(console.dir);