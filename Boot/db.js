const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.monngoURL
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect().then(() => {
    console.log("db Connected");
})
module.exports = db={
    
}


