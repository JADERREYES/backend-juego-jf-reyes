const express = require('express');
const router = express.Router();
const controller = require('../controllers/trivia.controller');

router.get('/questions', controller.getQuestions);
router.post('/questions', controller.addQuestion);

module.exports = router;
