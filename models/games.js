const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, require: true },
});

const answerSchema = new Schema({
  value: { type: String, require: true },
  correct: { type: Boolean, require: true },
});

const questionSchema = new Schema({
  title: { type: String, require: true },
  answers: [answerSchema],
});

const gamesSchema = new Schema(
  {
    owner_id: {type: String, require: true},
    title: { type: String, require: true },
    game: {
      theme: { type: String },
      questions: [questionSchema],
    },
    players: [playerSchema],
    share_code: { type: String, require: true },
    active: { type: Boolean, require: true}
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gamesSchema);

module.exports = Game;
