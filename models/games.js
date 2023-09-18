const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  title: { type: String, require: true },
  questions: { type: String, require: true },
  share_code: { type: String, requires: true},
}, {timestamps: true});

const Game = mongoose.model('Game', gamesSchema);

module.exports = Game;