require("dotenv").config();
const axios = require("axios");
const Game = require("../models/games");
const answerParser = require("./answerParser");
const saveQuiz = require("./db_data/saveQuiz");

const client = axios.create({
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_SECRET,
  },
});

const apiUrl = "https://api.openai.com/v1/chat/completions";

let prompt = "Create a 3 (0,1,2) choice quiz with 15 questions.\n";

module.exports = class AI {
  static async createhQuizGame(req, res) {
    const theme = req.query.theme;
    const age = req.query.age;
    const difficulty = req.query.difficulty;

    if (theme) {
      prompt += `The subject of the quiz should be ${theme}\n`;
    }
    if (age) {
      prompt += `The questions should be aimed at players aged ${age} years old.\n`;
    } else {
      prompt += "The questions should be aimed at players of all ages\n";
    }
    if (difficulty) {
      prompt +=
        `The difficulty of the quiz should be ${difficulty}` +
        "The 15 questions are divided into 3 equal levels, where the difficulty of the questions ramp up with each level.";
    }

    const params = {
      messages: [
        {
          role: "system",
          content:
            "You are a quiz generator. The formatting must be deterministic so that code can read it.",
        },
        {
          role: "system",
          content:
            "Format the questions like this:\n" +
            "[<the question>]\n" +
            "{<correct answer>}\n" +
            "{<incorrect answer 1>}\n" +
            "{<incorrect answer 2>}",
        },
        {
          role: "system",
          content: "Omit everything not included in the format parameters.",
        },
        { role: "system", content: prompt },
      ],
      stream: false,
      model: "gpt-3.5-turbo",
      temperature: 0.2,
    };

    try {
      const response = await client.post(apiUrl, params);
      const gameData = response.data.choices[0].message.content;
      const parsedQuestions = answerParser(gameData);
      saveQuiz(parsedQuestions, theme);
      res.status(200).json(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      return { error: "Error fetching data from backend" };
    }
  }
};
