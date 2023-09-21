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

app.use("/api", require("./routes/routes"));

// Adding sandbox data in db
app.get("/add-game", (req, res) => {
  const game = new Game({
    title: "Game Title",
    question: {
      title: "Does the connection work?",
      options: [
        { id: 1, value: "Option 1" },
        { id: 2, value: "Option 2" },
        { id: 3, value: "Option 3" },
      ],
      correct_answer: 1
    },
    share_code: "123A",
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
// app.use((req, res) => {
//   res.status(404).sendFile("./views/404.html", { root: __dirname });
// });
