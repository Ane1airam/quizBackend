require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Game = require("./models/games");

// express app
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your client's URL
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
// getting access to data coming from client form
app.use(express.urlencoded({ extended: true }));

// connecting to DB
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then((result) => {
    console.log("connected to db");
    // lsiten for requests
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/web_call", require("./routes/webroutes"))
app.use("/mobile_call", require("./routes/mobileroutes"))

