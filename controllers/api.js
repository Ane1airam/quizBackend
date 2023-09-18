const Game = require("../models/games");

module.exports = class API {
  static async fetchGameByID(req, res) {
    const id = req.params.id;
    try {
      const game = await Game.findById(id);
      res.status(200).json(game);
    } catch (error) {
      res.status(404).json({ message: error.message });
    // res.status(404)
    }
  }

  static async fetchGames(req, res) {
    try {
      const games = await Game.find();
      res.status(200).json(games);
    } catch (error) {
      res.status(404).json({ message: error.message });
    // res.status(404)
    }
  }
};
