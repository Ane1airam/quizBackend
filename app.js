require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Game = require("./models/games");
const db = require("./db/dibconfig");

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
// mongoose
//   .connect(process.env.DB_CONNECTION_STRING)
//   .then((result) => {
//     console.log("connected to db");
//     // lsiten for requests
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// lsiten for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/firestore/test", async (req, res) => {
  try {
    const data = await db.collection("games").get();
    data.forEach((doc) => {
      console.log("doc :", doc.data().test);
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

app.use("/mobile_call", require("./routes/mobileroutes"));

// working on the websocket server for the web app
// app.use("/web_call", require("./routes/webroutes"));
