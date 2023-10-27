module.exports = class QUIZ {
    static async getQuizList(req, res) {
        const game_code = req.params.game_code;
        try {
          const game = await Game.findOne({ share_code: game_code });
          if (!game) {
            res.status(404).json({ message: error.message });
          }
          res.status(200).json(game);
        } catch (error) {
          res.status(404).json({ message: error.message });
          // res.status(404)
        }
      }
}