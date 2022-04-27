const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8080;

//use midelware 
app.use(cors());
app.use(express.json())



//user: monirhrabby
//password: qTUW7pNP6qe1kPUN
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@fearless.5edwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const database = client.db("fearless").collection("products");

        app.get("/service", async(req,res)=>{
            const query = {};
            const cursor = database.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
    }
    finally{

    }
}

run().catch(console.dir)


app.get('/' , (req, res) => {
    res.send('My Node server is Running')
})


app.listen(port, ()=>{
    console.log('crud server is running');
})