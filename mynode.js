const express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.json());

app.post("/save", function(req, res) {
  mongoclient.connect(url, function(err, client) {
    if (err) {
      console.log("unable to connect");
    }

    var db = client.db("registration");

    db.collection("student").insertOne(req.body, function(err, data) {
      if (err) {
        console.log("unable tp fetch");
      }

      console.log(data);

      res.json({ message: "success" });
    });
    client.close();
  });
  console.log(req.body);
});

app.get("/view", function(req, res) {
  mongodb.connect(url, function(err, client) {
    if (err) throw err;

    var db = client.db("registration");
    var database = db
      .collection("student")
      .find()
      .toArray();
    database.then(function(data) {
      console.log(data);
      res.send(data);
    });
    client.close();
  });
  console.log(req.body);
});

app.listen(3000);
