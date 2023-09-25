const express = require('express')
const router = express.Router()
const api = require('../controllers/api')
const ai = require('../controllers/openaiconfig')


router.get('/createQuiz', ai.createhQuizGame)

module.exports = router;