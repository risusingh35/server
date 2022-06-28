const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const fs = require('fs')
const fsPromises = fs.promises;

require("dotenv").config();
const uri = process.env.monngoURL || 'mongodb://localhost:27017'
console.log('process.env.monngoURL', process.env.monngoURL);
module.exports = {
    getUserByEmail: async function (req, res) {
        try {
            const client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            client.connect().then(() => {
                console.log("db Connected");
            })
            loggedUserData = await client.db("Rk").collection("RkUser").findOne({ 'RkUserEmail': req.body.userName })
            if (loggedUserData) {
                let id = loggedUserData.RkUserEmail
                loggedUser = await client.db("Rk").collection("RkUser").findOne({ 'RkUserEmail': id, 'RkUserPw': req.body.password })
                if (loggedUser) {
                    console.log("process.cwd()", process.cwd());
                    let dirpath = process.cwd()
                    console.log(">>>>>>>>>>>>", dirpath);

                    let fsData = await fsPromises.readdir(dirpath);
                    console.log("fsData>>>>>>>>", fsData);
                    let obj = {
                        msg: "User Loggin Success",
                        statusCode: 200,
                        userName: loggedUser.RkUserName,
                        userId: id
                    }
                    console.log(obj);
                    res.send(obj)
                } else {
                    console.log('User ID or Password Mismatched');
                    let obj = {
                        msg: "User ID or Password Mismatched",
                        statusCode: 400
                    }
                    res.send(obj)
                }
            } else {
                console.log('User does not exist');
                let obj = {
                    msg: "User does not exist",
                    statusCode: 400
                }
                res.send(obj)
            }
        } catch (error) {
            console.log("Error while getting user by Email", error);
        }
    }
}