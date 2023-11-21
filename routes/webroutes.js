const express = require('express')
const router = express.Router()
const api = require('../controllers/api')
const ai = require('../controllers/openaiconfig')


router.get('/createQuiz', ai.createhQuizGame)
router.get('/getValidatedQuiz/:game_id', api.fetchGameById)
router.get('/validateQuizCode/:game_code', api.fetchGameByCode)

module.exports = router;