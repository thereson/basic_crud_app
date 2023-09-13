let express = require("express");
const mongoose = require("mongoose");
let PORT = 8080;
// let model = require("./models/model");

let user_route = require("./routes/userRoute");
let ec2_url = "mongodb://54.221.51.134:27017";
let mongo_url = "mongodb://127.0.0.1:27017";
let connect_mongodb = async (url) => {
  let conn = await mongoose.connect(url, { dbName: "api_test" });
  console.log("successfully connected to mongodb");
};
connect_mongodb(ec2_url);

let server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(user_route);

server.listen(8080, () => {
  console.log(`server listening on port ${PORT}`);
});
