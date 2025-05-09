// src/controllers/generate.controller.js

const openaiService = require("../services/openaiService");
const Question      = require("../models/trivia.model");

exports.generate = async (req, res) => {
  try {
    const { category } = req.body;
    const questions = await openaiService.generateQuestions(category);

    const saved = await Question.insertMany(
      questions.map(q => ({
        category,
        question: q.question,
        options: q.options,
        correctAnswer: q.correct
      }))
    );
    res.json(saved);
  } catch (err) {
    console.error("Error en generate.controller:", err);
    res.status(500).json({ error: "Error generando preguntas" });
  }
};
