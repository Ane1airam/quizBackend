const express = require("express");
const router = express.Router();
const api = require("../controllers/api");
const ai = require("../controllers/openaiconfig");
const quiz = require("../db/quizData");

// creates the quiz and saves it to the db
// http://localhost:5000/mobile_call/createQuiz?userId=userIdValue&quizName=quizNameValue&theme=themeValue&age=ageValue&difficulty=difValue
router.get("/createQuiz", ai.createhQuizGame);
// returns all the corresponding quizes of the user
router.get("/quizList", quiz.getQuizList);

module.exports = router;

// http://localhost:5000/mobile_call/createQuiz?userId=1234&quizName=test_quiz_name&theme=avengers&age=25&difficulty=hard
// http://localhost:5000/mobile_call/quizList?userId=1234
