const { MongoClient } = require("mongodb");
// const uri = "mongodb+srv://risu:singh@cluster0.9hybf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //altes
const uri = "mongodb://localhost:27017"; //compass
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = {
  creatSingle: async function (req, res) {
    await client.connect(); //connecting to DB
    let data = {};
    console.log("Inserte....................");
    try {
      let newResultData = [];
      // for (let i = 1; i < 2; i++) {

      //     data = {
      //         id: i,
      //         device: "device" + 1,
      //         amount: parseInt(Math.random() * 10),
      //         data: {
      //             time: new Date(),
      //             status: Math.round(Math.random()),
      //             temp: parseInt(Math.random() * 100),
      //             ActiveUser: parseInt(Math.random() * 1000),
      //             UserName: `RK${i}`
      //         }
      //     }

      //     newResultData = await client.db("mySampleDB").collection("RKK").insertOne(data)
      //     // console.log(`New record list created and id is: ${newResultData.insertedId}`);
      //     // console.log("Dta>>>>>>>>>>>>>>>newResultData", newResultData);
      // }
      let now = new Date();
      let ts = +now + +(330 * 60 * 1000);
      let tsGMT = +now + +(60 * 1000);
      console.log(ts);
      for (let i = 0; i < 1000; i++) {
        data = {
          newDate: new Date(),
          date: Date(),
          offset: now.getTimezoneOffset(),
          date2: new Date(now),
          tsDateLOcal: new Date(ts),
          tsLocal: ts,
          tsDateGMT: new Date(tsGMT),
          tsGMT: tsGMT,
        };

        newResultData = await client
          .db("mySampleDB")
          .collection("DateTime")
          .insertOne(data);
      }
      console.log(
        `New record list created and id is: ${newResultData.insertedId}`
      );
      console.log("Dta>>>>>>>>>>>>>>>", newResultData);
      console.log("22222222>>>>>>>>>>>newResultData", newResultData);
      res.send(newResultData);
    } catch (error) {
      console.log("ERROR:", error);
    }
  },
  mongopipe: async function (req, res) {
    await client.connect(); //connecting to DB
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

    let dd = [
      new Date("2022-05-06T17:52:30.399+00:00"),
      new Date("2022-05-06T17:52:40.399+00:00"),
      new Date("2022-05-06T17:52:50.399+00:00"),
      new Date("2022-05-06T17:53:00.399+00:00"),
      new Date("2022-05-06T18:03:00.399+00:00"),
      new Date("2022-05-06T18:26:00.399+00:00"),
      new Date("2022-05-06T18:40:00.399+00:00"),
      new Date("2022-05-06T18:52:00.399+00:00"),
      new Date("2022-05-06T19:02:00.399+00:00"),
    ];
    // get detail for collection
    let pipeline3 = [
      // {
      //     // $collStats: { storageStats: {} },
      //     // $collStats: { queryExecStats: {} }

      // },
      // { $match: { "data.time": { $gte: new Date('2022-05-10T12:18:a+00:00'), $lte: new Date() } } },
      { $match: { "data.status": { $eq: 1 } } },
      // { "$limit": 1000 },
      {
        $bucket: {
          groupBy: "$data.time",
          boundaries: dd,
          default: "Other",
          output: {
            count: { $sum: 1 },
            DeviceData: {
              $push: {
                TEMP: "$data.temp",
                USER: "$data.UserName",
                ActiveUser: "$data.ActiveUser",
                time: "$data.time",
              },
            },
          },
        },
      },
    ];

    let aggCursor3 = client
      .db("mySampleDB")
      .collection("RK")
      .aggregate(pipeline3, {
        allowDiskUse: true,
      });

    let data = [];
    for await (const doc of aggCursor3) {
      // console.log("Total Count=in RK =====================", doc.storageStats.count);
      // console.log("doc>>>>>>>>>>", doc);
      data.push(doc);
    }
    // for await (const doc of aggCursor3) {
    //     // console.log("Total Count=in RK =====================", doc.storageStats.count);
    //     console.log("doc>>>>>>>>>>", doc);
    //     data.push(doc)
    // }
    let totalData = [];
    for (let i = 0; i < data.length; i++) {
      totalData.push(data[i]);
    }
    // console.log("totalData>>>>>>>>>>>>", totalData);
    res.send(totalData);

    // const aggCursor = await client.db("mySampleDB").collection("DateTime").aggregate(pipeline);
    // const aggCursor = await client.db("mySampleDB").collection("RK").aggregate(pipeline);
    // let data1 = await client.db("mySampleDB").collection("RK").find({}).toArray()
    // console.log("data1>>>>>>>", data1);
    // await client.db("mySampleDB").collection("DateTime").find({
    //     now: {
    //         $gte: new Date('2022-05-07T05:59:38.770Z'), $lte: new Date()
    //     }
    // }).toArray(function (err, result) {
    //     if (err) throw err;
    //     console.log(result);

    // });
    // console.log("totalDataaaaaaaaaaaaaaaaaaaaaaaaa0", totalData);

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
  },
  mongopipe2: async function (req, res) {
    await client.connect(); //connecting to DB
    // collection("DateTime")
    let pipeline1 = [
      {
        $match: {
          now: {
            $gte: new Date("2022-05-09T02:28:37.823+00:00"),
            $lte: new Date(),
          },
        },
      },
      {
        $project: {
          inputDate2: "$date2",
          yearMonthDayUTC_Date2: {
            $dateToString: {
              format: "%Y-%m-%d-%H:%M:%S:%L%z",
              date: "$date2",
              timezone: "+05:30",
            },
          },
          Input_tsGMTISO: "$tsGMT",
          tsGMTISO: { $toDate: { $toLong: "$tsGMT" } },
          tsDateLOcal: {
            $dateToString: {
              format: "%Y-%m-%d-%H:%M:%S:%L%z",
              date: { $toDate: { $toLong: "$tsGMT" } },
              timezone: "+05:30",
            },
          },
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
              date: "$date2",
              timezone: "+05:30",
            },
          },
        },
      },
      {
        $limit: 100,
      },
    ];
    let aggCursor1 = await client
      .db("mySampleDB")
      .collection("RK")
      .aggregate(pipeline1);

    let data = [];
    for await (const doc of aggCursor1) {
      data.push(doc);
    }

    let totalData = [];
    for (let i = 0; i < data.length; i++) {
      totalData.push(data[i]);
    }
    console.log("totalData>>>>>>>>>>>>", totalData);
    res.send(totalData);
  },
  outhUser: async function (req, res) {
    client.connect();
    // const uri = "mongodb+srv://risu:singh@cluster0.9hybf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //altes
    console.log("loggedUser>>>>>>>>>>>>");
    let loggedUser = client
      .db("admin")
      .collection("RK_USER")
      .find({})
      .toArray();
    console.log("loggedUser>>>>>>>>>>>>");
    await loggedUser.then((obj) => {
      console.log(obj);
      res.send(obj);
    });
  },
  mongoFlow: async function (req, res) {
    try {
      await client.connect(); //connecting to DB

      // client.db("mySampleDB").collection("FLOW").insertOne(data)
      let data1;
      let now = new Date();
      let ts = +now + +(330 * 60 * 1000);
      console.log(ts);
      for (let i = 0; i > 100; i++) {
        data1 = {
          time: new Date(),
          ts: ts,
          device: "FLOW",
          data: {
            FLOW: parseFloat(Math.random() * 1000).toFixed(2),
            TOTAL: parseInt(Math.random() * 1000),
          },
        };
        // console.log(data1);
        let newResultData = await client
          .db("mySampleDB")
          .collection("FLOW")
          .insertOne(data1);
        // console.log(`New record list created and id is: ${newResultData.insertedId}`);
        // console.log("Dta>>>>>>>>>>>>>>>newResultData", newResultData);
      }
      let pipeline5 = [
        { $match: { time: { $lte: new Date() } } },
        { $limit: 1000 },
        // {
        //     $push: {
        //         TOTAL: { borderColor: "#1bf90b", data: "$data.total" },
        //         labels: { $dateToString: { format: "%Y-%m-%d-%H:%M:%S:%L%z", date: "$time", timezone: "+05:30" } },
        //     }
        // },
      ];
      let aggCursor5 = client
        .db("mySampleDB")
        .collection("FLOW")
        .aggregate(pipeline5, {
          allowDiskUse: true,
        });

      let TOTAL = [];
      let labels = [];
      let FLOW = [];
      let obj = {};
      let obj1 = {};
      let obj3 = [];
      let i = 0;
      for await (const doc of aggCursor5) {
        labels.push(i);
        i++;
        TOTAL.push(doc.data.TOTAL);
        FLOW.push(doc.data.FLOW);
        // console.log("result:::::::::::::::::::::::");
      }
      let result = {};
      obj = { borderColor: "#1bf90b", data: TOTAL, label: "TOTAL" };
      obj1 = { borderColor: "#ea1010", data: FLOW, label: "FLOW" };
      obj3.push(obj, obj1);
      result = { datasets: obj3, labels: labels };
      // console.log("result:::::::::::::::::::::::", result);
      res.send(result);
    } catch (error) {
      console.log("Error:", error);
    }
  },
  mongoHighChartInsert: async function (req, res) {
    try {
      const { MongoClient } = require("mongodb");
      // const uri = "mongodb+srv://risu:singh@cluster0.9hybf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //altes
      const uri = "mongodb://localhost:27017"; //compass
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await client.connect(); //connecting to DB

      // client.db("mySampleDB").collection("FLOW").insertOne(data)
      let data1;
      let now = new Date();
      let ts = +now + +(330 * 60 * 1000);
      let oneMin = 6e4;
      console.log("tttttt", ts);
      for (let i = 0; i < 500000; i++) {
        let time1 = +now + oneMin * i;
        data1 = {
          time: new Date(time1),
          ts: ts,
          device: "FLOW",
          data: {
            FLOW: parseFloat(Math.random() * 1000).toFixed(2),
            TOTAL: parseInt(Math.random() * 1000),
          },
        };
        console.log(data1, i);
        let newResultData = await client
          .db("mySampleDB")
          .collection("FLOW")
          .insertOne(data1);
        console.log(
          `New record list created and id is: ${newResultData.insertedId}`
        );
        console.log("Dta>>>>>>>>>>>>>>>newResultData", newResultData);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  },
  mongoHighChart: async function (req, res) {
    try {
      await client.connect(); //connecting to DB
      let pipeline5 = [
        { $match: { device: { $eq: "FLOW" } } },
        { $limit: 1000 },
        // {
        //     $push: {
        //         TOTAL: { borderColor: "#1bf90b", data: "$data.total" },
        //         labels: { $dateToString: { format: "%Y-%m-%d-%H:%M:%S:%L%z", date: "$time", timezone: "+05:30" } },
        //     }

        // },
      ];
      let aggCursor5 = client
        .db("mySampleDB")
        .collection("FLOW")
        .aggregate(pipeline5, {
          allowDiskUse: true,
        });
      let tData2 = [];
      let tData = [];
      let series = [];
      let obj1 = {};
      let result = {};

      // let flowAndTime={}
      for await (const doc of aggCursor5) {
        let dt = [doc.ts, doc.data.TOTAL];
        let dt2 = [doc.ts, Number(doc.data.FLOW)];
        tData.push(dt);
        tData2.push(dt2);
      }
      // console.log(tData);
      series.push(
        // { data: tData },
        // { data: tData2 }
        {
          color: "#00c48d",
          data: tData,
          name: "TOTAL",
          // pointStart: time[0],
          // pointInterval: 36e5,

          tooltip: {
            valueSuffix: "-RK",
          },
        },
        {
          color: "#ff4b1e",
          data: tData2,
          name: "FLOW",

          tooltip: {
            valueSuffix: "-TIME",
          },
        }
      );
      obj1 = {
        series: series,
        chart: {
          // type: "scatter",
          zoomType: "x",
          // height: 520,
          width: 1820,
          backgroundColor: "#eee",
        },
        title: {
          text: "FLOW AND TOTAL",
        },
        subtitle: {
          text: "SubTitle",
        },
        rangeSelector: {
          enabled: true,
          // selected: 0,
        },
        scrollbar: {
          enabled: false,
        },

        navigator: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          type: "datetime",
          title: {
            text: "Date Time",
          },
          labels: {
            format: "{value:%d %b %y %H:%M %p}",
            rotation: 55,
            align: "left",
            enabled: true,
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
        yAxis: {
          // min: 0,
          // max: 1400,
          // tickInterval: 100,
          lineColor: "#ea198c",
          lineWidth: 1,
          title: {
            text: "Y-Axix Values",
          },
          plotLines: [
            {
              value: 1,
              width: 5,
              color: "#faaf",
            },
          ],
        },

        // legend: {
        //   layout: "vertical",
        //   align: "right",
        //   verticalAlign: "middle",
        //   borderWidth: 0,
        // },
        // mapNavigation: {
        //   enableMouseWheelZoom: true,
        // },
      };

      result = {
        chartOptions: obj1,
      };
      res.send(result);
      // console.log("result:::::::::::::::::::::::", result);
    } catch (error) {
      console.log("Error:", error);
    }
  },
};
