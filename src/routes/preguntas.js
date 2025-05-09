const express = require('express');
const Pregunta = require('../models/Pregunta');
const router = express.Router();

// Obtener todas las preguntas
router.get('/', async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nueva pregunta
router.post('/', async (req, res) => {
  const { pregunta, opciones, respuestaCorrecta, categoria } = req.body;

  const nuevaPregunta = new Pregunta({
    pregunta,
    opciones,
    respuestaCorrecta,
    categoria
  });

  try {
    const preguntaGuardada = await nuevaPregunta.save();
    res.status(201).json(preguntaGuardada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una pregunta
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Pregunta.findByIdAndDelete(req.params.id);
    if (!resultado) return res.status(404).json({ message: 'No encontrada' });
    res.json({ message: 'Pregunta eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
