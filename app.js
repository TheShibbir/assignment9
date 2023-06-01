
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

// security middleware
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const router = require("./src/routes/api");

const app = express();

//Middleware
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(hpp());
app.use(morgan("dev"));


app.use(express.static("public"));

// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// request rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    
    console.log("mongodb database connected");
  })
  
  .catch((error) => console.log(error));

// routing implement
app.use("/", router);

// 404 route
app.use((req, res) => {
  res.status(404).json({
    msg: "Route not found",
  });
});

// error handler route

app.use((err, req, res, next) => {

  console.error(err.stack);
  res.status(500).send(err.message);
});

module.exports = app;