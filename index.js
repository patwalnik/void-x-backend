import indexV1 from "./server/routes/indexV1.route";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import mongoose from "mongoose";
import configHolder from "./config/config";
import APIError from "./server/helpers/apiError";
import helperFunction from "./server/helpers/helperFunction";
import cluster from "cluster";
import numCPUs from "os";
import http from "http";
import spdy from "spdy";
import http2 from "http2";
import fs from "fs";

const express = require("express");
const app = express();

//certificates
const options = {
  key: fs.readFileSync("./certificate/ssl/test.key"),
  cert: fs.readFileSync("./certificate/ssl/test.crt")
};
//compressing api response
app.use(compression());

//logger
app.use(morgan("dev"));

//cors enable
app.options("*", cors());
app.use(cors({ origin: configHolder.httpPort }));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//database connection
mongoose.connect(configHolder.mongodb.url, { useNewUrlParser: true }, err => {
  console.log("data error ", err);
  console.log("database connected");
});
// mongoose.Promise = global.Promise // use mongoose in different position inside the codes it must be viewed as global mode not needed in  >v4

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  res.header("Access-Control-Max-Age", "1000");
  next();
});

//all the routed to this file
app.use("/errorLogs", express.static(__dirname + "/../logs/error.log"));
app.use("/api", indexV1);

//catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new APIError("API not found", 404);
//   return next(err);
// });
app.use((err, req, res, next) => {
  if (err.status) {
    return res
      .status(500)
      .json(helperFunction.responseHandler(false, { message: err.message }));
  } else {
    console.log(err);
    return res.status(500).json(
      helperFunction.responseHandler(false, {
        message: "something went wrong"
      })
    );
  }
});


//cluster is working for using all the available nodes
app.listen(configHolder.httpPort, () => {
  console.log(`Example app listening at http://localhost:${configHolder.httpPort}`)
})