const Game = require("../../models/games");

function saveQuiz(quizData) {
  console.log("quizData ", quizData);
  const newGame = new Game({
    title: "Here will go the title that the user provides for his/hers game",
    game: {
      theme:
        "theme will be provided by the URL on the API call for getting quizzes",
      questions: quizData.map((questionData) => ({
        title: questionData.question,
        answers: questionData.answers.map((answer, i) => ({
          value: answer,
          correct: answerValidation(i),
        })),
      })),
    },
    share_code: "123A",
  });

  newGame
    .save()
    .then((result) => {
      console.log('Game saved');
    })
    .catch((err) => {
      console.log(err);
    });
}

function answerValidation(i) {
  if (i === 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = saveQuiz;
