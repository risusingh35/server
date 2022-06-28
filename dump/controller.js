
const fs = require('fs')
const fsPromises = fs.promises;
module.exports = {

    home: function (req, res) {
        console.log("Hello from homeController");
        res.json({ "statusCode": 200, "Routre": req.url, "User": "Rishu Singh" })
    },
    rk: function (req, res) {
        console.log("Hello from RK Controller");
        res.send("Hello from RK Controller")
    },

    fs: async function (req, res) {
        let dir = __dirname
        try {
            let fsData = await fsPromises.readdir(dir);
            console.log(fsData);
            res.send(fsData)
        } catch (err) {
            console.error('Error occured while reading directory!', err);
        }
    },

}
