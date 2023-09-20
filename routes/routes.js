const express = require('express')
const router = express.Router()
const api = require('../controllers/api')


router.get('/backend', (req,res)=>{
    res.json({message: 'hello from the nackend'})
})
router.get('/get-games', api.fetchGames)
router.get('/:id', api.fetchGameByID);
router.get('/game-code/:game_code', api.fetchGamesByCode)

module.exports = router;