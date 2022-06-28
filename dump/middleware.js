
module.exports = {
    home: function (req, res, next) {
        console.log("Home Auth Called from middleware");
        console.log(req.url);
        if (req.url == `/`) {
            next();
            console.log("No Error");
        }
        else {
            console.log("Error in middleware");
            res.send("Error in Middleware")

        }
    },
    rk: function (req, res, next) {
        console.log(req.url);
        if (req.url == `/`) {
            next()
        }
        else {
            console.log("Error in middleware");
            res.send("Error in Middleware")

        }
    }
}