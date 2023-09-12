let express = require("express");
const mongoose = require("mongoose");
let PORT = 8080;
let model = require("./models/model");
let ec2_url = "mongodb://54.221.51.134:27017";
// let mongo_url = "mongodb://127.0.0.1:27017";
let connect_mongodb = async (url) => {
  let conn = await mongoose.connect(url, { dbName: "api_test" });
  console.log("successfully connected to mongodb");
};
connect_mongodb(ec2_url);

let server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.post("/api", async (req, res) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      throw new Error("invalid request body");
    } else {
      let user = new model({ name: req.body.name });
      await user.save();
      res.status(201).send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

server.get("/api/:user_id", async (req, res) => {
  let id = req.params.user_id;
  let user = await model.find({ _id: id });
  try {
    if (user.length === 0) {
      throw new Error(`id ${id} not found`);
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});
server.patch("/api/:user_id", async (req, res) => {
  let id = req.params.user_id;
  let { name } = req.body;
  try {
    let user = await model.find({ _id: id });
    if (user.length == 0) {
      throw new Error(`invalid id ${id}`);
    }
    await model.updateOne({ _id: id }, { $set: { name: name } });
    let responce = {
      message: "user updates",
      id: user._id,
      new_name: name,
    };
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

server.delete("/api/:user_id", async (req, res) => {
  let id = req.params.user_id;
  try {
    let user = await model.find({ _id: id });
    if (user.length == 0) {
      throw new Error(`invalid id ${id}`);
    }
    await model.deleteOne({ _id: id });
    let responce = {
      message: "user deleted",
      id: user._id,
      name: user.name,
    };
    res.status(200).json(responce);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

server.listen(8080, () => {
  console.log(`server listening on port ${PORT}`);
});
