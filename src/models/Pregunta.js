const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  opciones: [{ type: String, required: true }],
  respuestaCorrecta: { type: String, required: true },
  categoria: { type: String }
});

module.exports = mongoose.model('Pregunta', preguntaSchema);
