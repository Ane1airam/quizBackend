function answerParser(answerData) {
  const lines = answerData.split('\n');
  const questionsAndAnswers = [];
  let currentQuestion = null;

  for (const line of lines) {
    if (line.startsWith("[")) {
      let questionLine = line
        .substring(line.indexOf("[")+1,line.indexOf("]"));
      currentQuestion = {
        question: questionLine,
        answers: [],
      };
      } else if (line.startsWith('{')){
          let answer= line.substring(line.indexOf('{')+1,line.indexOf('}')).trim();
          currentQuestion.answers.push(answer)
      }
      console.log("current question ", currentQuestion);
    if (currentQuestion.answers.length === 3){
        questionsAndAnswers.push(currentQuestion)
        currentQuestion = null;
  }
  }
  return questionsAndAnswers;
}

module.exports = answerParser;
