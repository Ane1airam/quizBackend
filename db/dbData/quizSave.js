const shareCodeGenerator = require("../../controllers/db_data_mongo/shareCodeGenerator");
const db = require("../dibconfig");

exports.quizSave = async (
  userId,
  parsedQuestions,
  quizName,
  theme,
  age,
  difficulty
) => {
  try {
    const quizObject = {
      userId: userId ? userId : "",
      name: quizName ? quizName : "",
      game: {
        theme: theme ? theme : "general",
        questions: parsedQuestions.map((q) => {
          return {
            title: q.question,
            answers: q.answers.map((a, i) => {
              return {
                value: a,
                correct: answerValidation(i),
              };
            }),
          };
        }),
      },
      age: age ? age : "",
      difficulty: difficulty ? difficulty : "",
      share_code: shareCodeGenerator(),
    };
    // saves t eh quiz into the games collection
    const document = await db.collection("games").add(quizObject);
    // saves the quiz id to the users quiz collection
    const userRef = await db
      .collection("users")
      .doc(userId)
      .collection("gameIds")
      .add({ gameId: document.id });
  } catch (error) {
    console.log("Error saving the quiz : ", error);
  }
};

function answerValidation(i) {
  if (i === 0) {
    return true;
  } else {
    return false;
  }
}
