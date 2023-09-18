require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Game = require("./models/games");

// express app
const app = express();

// connecting to DB
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then((result) => {
    console.log("connected to db");
    // lsiten for requests
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });

app.set("view engine", "ejs");
// getting access to data coming from client form
app.use(express.urlencoded({ extended: true }));

// Adding sandbox data in db
app.get("/add-game", (req, res) => {
  const game = new Game({
    title: "Test Game 3",
    questions: "Does the connection work?",
    share_code: "123C",
  });

  game
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/get-games", (req, res) => {
  Game.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", (req, res) => {
  console.log(req.body);
});
// app.get("/", (req, res) => {
//   // res.send('<p>home page</p>');
//   res.sendFile("./views/index.html", { root: __dirname });
// });

// app.get("/about", (req, res) => {
//   // res.send('<p>about page</p>');
//   res.sendFile("./views/about.html", { root: __dirname });
// });

// // redirecst
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
