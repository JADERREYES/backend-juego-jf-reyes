// src/models/trivia.model.js

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  options: [String],
  correctAnswer: String,
});

module.exports = mongoose.model("Question", questionSchema);
