let express = require("express");
const mongoose = require("mongoose");
let PORT = 8080;
let model = require("./models/model");
let ec2_url = "mongodb://54.221.51.134:27017";
let mongo_url = "mongodb://127.0.0.1:27017";
let connect_mongodb = async (url) => {
  let conn = await mongoose.connect(url, { dbName: "api_test" });
  console.log("successfully connected to mongodb");
};
connect_mongodb(mongo_url);

let server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/api/:user_id", async (req, res) => {
  let id = req.params.user_id;
  let user = await model.find({ _id: id });
  if (user.length === 0) {
    return res.json(`no record of any user with the id ${id}`);
  }
  res.json(user);
});

server.post("/api", async (req, res) => {
  console.log(req.body);
  try {
    if (JSON.stringify(req.body) === "{}") {
      res.send("please pass in a request body");
    } else {
      let user = new model({ name: req.body.name });
      await user.save();
      res.send(user._id);
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
server.delete("/api/:user_id", async (req, res) => {
  let id = req.params.user_id;
  let user = await model.find({ _id: id });
  console.log(user);
  if (user.length == 0) {
    return res.send(
      "No record of any user with the id" + `${id}` + " " + "found"
    );
  }
  await model.deleteOne({ _id: id });
  res.send(`successfully deleted user with the id ${id}`);
});

server.patch("/api/:user_id", (req, res) => {});

server.listen(8080, () => {
  console.log(`server listening on port ${PORT}`);
});
