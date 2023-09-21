const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  id: {type: Number, required: true},
  value: {type: String, require:true}
})

const questionSchema = new Schema({
  title: { type: String, require: true },
  options: {type: [optionSchema], require: true},
  correct_answer: { type: Number, require: true},
})

const gamesSchema = new Schema({
  title: { type: String, require: true },
  question: { type: questionSchema, require: true },
  share_code: { type: String, requires: true},
}, {timestamps: true});

const Game = mongoose.model('Game', gamesSchema);

module.exports = Game;