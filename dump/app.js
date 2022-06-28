const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const config = require("./dump/config/db");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const host = process.env.HOST;
app.use(cors());
const allRoute = require("./dump/allRoute");
app.use(allRoute);

// async function mongoHighChartInsert() {
//   try {
//     // const uri = "mongodb+srv://risu:singh@cluster0.9hybf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //altes
//     const uri = "mongodb://localhost:27017"; //compass
//     const client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     await client.connect(); //connecting to DB

//     let deletedOne =
//       // await client
//       //   .db("mySampleDB")
//       //   .collection("FLOW")
//       //   .find({ ts: 1739692464267 })
//       //   .toArray();
//       await client
//         .db("mySampleDB")
//         .collection("FLOW")
//         .deleteMany({
//           ts: { $gte: 1667271062000 },
//         });
//     console.log("deletedData>>>>", deletedOne);
//     let data1;
//     let oneMin = 24 * 60 * 6e4;
//     let now = new Date();
//     for (let i = 1; i > 1000; i++) {
//       let time1 = +now + oneMin * i;
//       let ts = +time1 + +(330 * 60 * 1000);
//       data1 = {
//         time: new Date(time1),
//         ts: ts,
//         device: "FLOW",
//         data: {
//           FLOW: parseFloat(Math.random() * 1000).toFixed(2),
//           TOTAL: parseInt(Math.random() * 1000),
//         },
//       };
//       console.log(data1, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", i);
//       let newResultData = await client
//         .db("mySampleDB")
//         .collection("FLOW")
//         .insertOne(data1);
//       console.log(
//         `New record list created and id is: ${newResultData.insertedId}`
//       );
//       console.log("Dta>>>>>>>>>>>>>>>newResultData", newResultData);
//     }
//   } catch (err) {
//     console.log("Error:", err);
//   }
// }
//mongoHighChartInsert();

const dir = __dirname;
console.log("Dir:", dir);
app.listen(port, host, () => {
  console.log(`server startd at http://${host}:${port}`);
});
