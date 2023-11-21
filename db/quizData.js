const db = require("../db/dibconfig");

module.exports = class QUIZ {
  static async getQuizList(req, res) {
    const user = req.query.userId;

    try {
      const quizList = await db
        .collection("users")
        .doc("1234")
        .collection("gameIds")
        .get();

      const quizListData = [];
      quizList.forEach((doc) => {
        quizListData.push(doc.data().gameId);
      });
      res.status(200).json(quizListData);
    } catch (error) {
      console.log("Error on getting the quiz list : ", error);
    }
  }
};
