const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user1:user1@cluster0.uqzmjre.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri)

async function MongoDeleteAll() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    
        const collection = client.db("eshop").collection("products")
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
        var count = await collection.countDocuments()
        if(count.toString() == 0) {
            count = "ahoj"
        }
        if(count.toString() == 1) {
            count = "00000" + count
        }
        else if(count.toString() == 2) {
            count = "0000" + count
        }
        else if(count.toString() == 3) {
            count = "000" + count
        }
        else if(count.toString() == 4) {
            count = "00" + count
        }
        else if(count.toString() == 5) {
            count = "0" + count
        }
  
        const product = {
            productTitle: "item-title #" + count,
            productDescription: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Mauris dictum facilisis augue. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Fusce nibh. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Nullam at arcu a est sollicitudin euismod. Vivamus ac leo pretium faucibus. Integer vulputate sem a nibh rutrum consequat. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim.",
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

//MongoDeleteAll().catch(console.dir);
//MongoInsertObject().catch(console.dir);
// deleteObjectsByCondition().catch(console.dir);