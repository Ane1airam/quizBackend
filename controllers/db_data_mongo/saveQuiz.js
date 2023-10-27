// Not in use

const Game = require("../../models/games");
const shareCodeGenerator = require("./shareCodeGenerator");

function saveQuiz(quizData, quizTheme) {
  if(!quizTheme){
    quizTheme = "General"
  }
  const newGame = new Game({
    owner_id: "user id goes here",
    title: "Here will go the title that the user provides for his/hers game",
    game: {
      theme:
        quizTheme,
      questions: quizData.map((questionData) => ({
        title: questionData.question,
        answers: questionData.answers.map((answer, i) => ({
          value: answer,
          correct: answerValidation(i),
        })),
      })),
    },
    share_code: shareCodeGenerator(),
    active: false,
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
