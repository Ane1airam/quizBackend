require("dotenv").config();
const axios = require("axios");

const client = axios.create({
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_SECRET,
  },
});

const apiUrl = "https://api.openai.com/v1/chat/completions";

let prompt = "Create a 3 (0,1,2) choice quiz with 2 questions.\n";

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
        "The 2 questions are divided into 3 equal levels, where the difficulty of the questions ramp up with each level.";
    }

    const params = {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.2,
    };

    try {
      const response = await client.post(apiUrl, params);
      console.log('response : ', response.status);
      res.status(200).json(response.data.choices);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      return { error: "Error fetching data from backend" };
    }
  }
};
