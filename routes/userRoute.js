const express = require("express");

let model = require("../models/model");

const router = express.Router();

router.post("/api", async (req, res) => {
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

router.get("/api/:user_id", async (req, res) => {
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

router.patch("/api/:user_id", async (req, res) => {
  let id = req.params.user_id;
  let { name } = req.body;
  try {
    let user = await model.find({ _id: id });
    if (user.length == 0) {
      throw new Error(`invalid id ${id}`);
    }
    await model.updateOne({ _id: id }, { $set: { name: name } });
    let responce = {
      message: "user updated",
      id: user._id,
      new_name: name,
    };
    res.status(200).send(responce);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.delete("/api/:user_id", async (req, res) => {
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

module.exports = router;
