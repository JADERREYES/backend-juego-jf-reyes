// src/services/openaiService.js

// Importa directamente la clase OpenAI
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateQuestions = async (category) => {
  const prompt = `
Genera 5 preguntas de trivia sobre "${category}". 
Para cada pregunta, da 4 opciones (A, B, C, D) y marca cuál es la correcta.
Devuélvelo en JSON con formato:
[
  {
    "question": "...",
    "options": ["op1","op2","op3","op4"],
    "correct": "opX"
  }, ...
]
  `;

  // Llama a completions.create en lugar de createCompletion
  const resp = await openai.completions.create({
    model: "text-davinci-003",
    prompt,
    max_tokens: 800,
    temperature: 0.7,
  });

  // Parsea la respuesta JSON
  return JSON.parse(resp.choices[0].text);
};
