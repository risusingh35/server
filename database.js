const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://risu:singh@cluster0.9hybf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //altes
// const url = "mongodb://localhost:27017" //compass
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = {
    mainss: async function () {
        let result
        try {
            await client.connect()//connecting to DB
            result = 'DB Connected'

        } catch (err) {
            result = err
        }

        return result
    },
    creatSinglee: async function () {
        await client.connect()//connecting to DB
        let data = {}
        console.log("Inserte....................");
        for (let i = 0; i < 2; i++) {

            data = {
                id: i,
                // device: "device" + 1,
                // amount: parseInt(Math.random() * 10),
                // data: {
                //     time: new Date(),
                //     status: Math.round(Math.random()),
                //     temp: parseInt(Math.random() * 100),
                //     ActiveUser: parseInt(Math.random() * 1000),
                //     UserName: `RK${i}`
                // }
            }

            // const newResultData = client.db("mySampleDB").collection("RKDEVICE1").insertOne({ id: i });
            // console.log("Dta>>>>>>>>>>>>>>>", data);
            console.log("Dta>>>>>>>>>>>>>>>", i);
            // console.log(`New record list created and id is: ${newResultData.insertedId}`);
            // }

            // let now = new Date()
            // let ts = +now + +(330 * 60 * 1000)
            // let tsGMT = +now + +(60 * 1000)
            // console.log(ts);
            // for (let i = 0; i < 1; i++) {
            //     data = {
            //         newDate: new Date(),
            //         date: Date(),
            //         offset: now.getTimezoneOffset(),
            //         date2: new Date(now),
            //         tsDateLOcal: new Date(ts),
            //         tsLocal: ts,
            //         tsDateGMT: new Date(tsGMT),
            //         tsGMT: tsGMT

            //     }

            //     const newResultData = await client.db("mySampleDB").collection("DateTime").insertOne(data);
            //     console.log(`New record list created and id is: ${newResultData.insertedId}`);
            //     console.log("Dta>>>>>>>>>>>>>>>", data);
        }

    },
    mongopipee: async function (req, res) {
        await client.connect()//connecting to DB
        // collection("DateTime")
        let pipeline1 = [

            {
                $match: { now: { $gte: new Date('2022-05-09T02:28:37.823+00:00'), $lte: new Date() } }
            },
            {
                $project: {

                    inputDate2: "$date2",
                    yearMonthDayUTC_Date2: { $dateToString: { format: "%Y-%m-%d-%H:%M:%S:%L%z", date: "$date2", timezone: "+05:30" } },
                    Input_tsGMTISO: "$tsGMT",
                    tsGMTISO: { $toDate: { $toLong: "$tsGMT" } },
                    tsDateLOcal: { $dateToString: { format: "%Y-%m-%d-%H:%M:%S:%L%z", date: { $toDate: { $toLong: "$tsGMT" } }, timezone: "+05:30" } },
                    // timewithOffset530: { $dateToString: { format: "%H:%M:%S:%L%z", date: "$date2", timezone: "+05:30" } },
                    // timewithOffsetNY: { $dateToString: { format: "%H:%M:%S:%L%z", date: "$date2", timezone: "+05:30" } },
                    // minutesOffsetNY: { $dateToString: { format: "%Z", date: "$date2", timezone: "+05:30" } },

                    // "getHour": {
                    //     $hour: { date: "$date2", timezone: "+05:30" }
                    // },
                    // "getMinute": {
                    //     $minute: { date: "$date2", timezone: "+05:30" }
                    // },
                    // "getSecond": {
                    //     $second: {
                    //         date: "$date2", timezone: "+05:30"
                    //     }
                    // },
                    date22222222222222: {
                        $dateToParts: {
                            date: "$date2", timezone: "+05:30"
                        }
                    },

                }
            },
            {
                $limit: 1
            }
        ];
        let aggCursor1 = await client.db("mySampleDB").collection("DateTime").aggregate(pipeline1);
        for await (const doc of aggCursor1) {
            console.log(doc);
        }
        console.log("Agrigation Result end.........collection(DateTime)....................");

        // collection("RK")
        console.log("Agrigation Result start?// collection(RK)??????????????????????????");
        // let pipeline2 = [
        //     {
        //         '$group': {
        //             '_id': '$data.ActiveUser',
        //             'TotalValue': {
        //                 '$sum': '$amount'
        //             }
        //         }
        //     }, {
        //         '$sort': {
        //             '_id': 1
        //         }
        //     }, {
        //         '$limit': 10
        //     }
        // ];

        // let aggCursor2 = await client.db("mySampleDB").collection("RK").aggregate(pipeline2);
        // for await (const doc of aggCursor2) {
        //     console.log(doc);
        // }
        console.log("Agrigation Result end.........collection(RK)....................");
        let dd = [new Date('2022-05-07T01:30:41.757+00:00'), new Date('2022-05-07T01:30:47.500+00:00'), new Date('2022-05-07T01:30:47.600Z'), new Date('2022-05-07T01:30:47.700Z')]
        // get detail for collection
        let pipeline3 = [
            // {
            //     // $collStats: { storageStats: {} },
            //     // $collStats: { queryExecStats: {} }

            // },
            { $match: { "data.time": { $gte: new Date('2022-05-07T01:30:41.767+00:00'), $lte: new Date() } } },
            // { "$limit": 1000 },
            {
                $bucket: {
                    groupBy: "$data.time",
                    boundaries: dd,
                    default: "Other",
                    output: {
                        "count": { $sum: 1 },
                        "DeviceData": { $push: { TEMP: "$data.temp", USER: "$data.UserName", ActiveUser: "$data.ActiveUser", time: "$data.time", } }
                    }
                }
            },





        ]
        let aggCursor3 = client.db("mySampleDB").collection("RK").aggregate(pipeline3, {
            allowDiskUse: true
        });



        // for (const [key] of Object.entries(aggCursor3)) {
        //     console.log(`${key}`);
        // }

        let data = []
        for await (const doc of aggCursor3) {
            // console.log("Total Count=in RK =====================", doc.storageStats.count);
            console.log("doc>>>>>>>>>>", doc);
            data.push(doc)
        }
        // console.log(aggCursor3);
        let totalData = []
        for (let i = 0; i < data.length; i++) {
            totalData.push(data[i])

        }
        // console.log("totalData>>>>>>>>>>>>", totalData);

        // const aggCursor = await client.db("mySampleDB").collection("DateTime").aggregate(pipeline);
        // const aggCursor = await client.db("mySampleDB").collection("RK").aggregate(pipeline);

        // await client.db("mySampleDB").collection("DateTime").find({
        //     now: {
        //         $gte: new Date('2022-05-07T05:59:38.770Z'), $lte: new Date()
        //     }
        // }).toArray(function (err, result) {
        //     if (err) throw err;
        //     console.log(result);

        // });
        console.log("totalDataaaaaaaaaaaaaaaaaaaaaaaaa0", totalData);


        // let pipeline4 = [
        //     { $match: { status: "A" } },
        //     {
        //         $redact: {
        //             $cond: {
        //                 if: { $eq: ["$level", 5] },
        //                 // then: "$$PRUNE",  //remove
        //                 then: "$$KEEP", //keep
        //                 else: "$$DESCEND"
        //             }
        //         }
        //     }
        // ]

        // let aggCursor4 = client.db("mySampleDB").collection("dump").aggregate(pipeline4, {
        //     allowDiskUse: true
        // });

        // for await (const doc of aggCursor4) {

        //     console.log("doc>>>>>>>>>>", doc);

        // }


        res.send(data[0].DeviceData)
    },
}
