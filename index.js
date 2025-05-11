// 1) Carga de variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// 2) Imports
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// 3) Creación de la app
const app = express();
app.use(cors());
app.use(express.json());

// 4) Conexión a MongoDB
console.log('MONGODB_URI =', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// 5) Definición del esquema y modelo Mongoose
const preguntaSchema = new mongoose.Schema({
  tema: String,
  pregunta: String,
  respuestas: [String],
  correcta: String,           // añadimos campo correcta para feedback
});
const Pregunta = mongoose.model('Pregunta', preguntaSchema);

// 6) Pool de preguntas de ejemplo
const PREGUNTAS_EJEMPLO = {
  Ciencia: [
    {
      pregunta: "¿Qué planeta es conocido como el planeta rojo?",
      respuestas: ["Marte","Venus","Mercurio","Júpiter"],
      correcta: "Marte"
    },
    /* …4 preguntas más… */
  ],
  Historia: [
    {
      pregunta: "¿En qué año comenzó la Primera Guerra Mundial?",
      respuestas: ["1914","1918","1939","1945"],
      correcta: "1914"
    },
    /* …4 preguntas más… */
  ],
  Arte: [
    {
      pregunta: "¿Quién pintó la Mona Lisa?",
      respuestas: ["Leonardo da Vinci","Pablo Picasso","Vincent van Gogh","Miguel Ángel"],
      correcta: "Leonardo da Vinci"
    },
    /* …4 preguntas más… */
  ],
  Geografía: [
    {
      pregunta: "¿Cuál es la montaña más alta del mundo?",
      respuestas: ["Monte Everest","K2","Kangchenjunga","Lhotse"],
      correcta: "Monte Everest"
    },
    /* …4 preguntas más… */
  ],
  Deportes: [
    {
      pregunta: "¿Cuántos jugadores hay en un equipo de fútbol en el campo?",
      respuestas: ["11","7","9","5"],
      correcta: "11"
    },
    /* …4 preguntas más… */
  ],
};

// 7) Función que toma N preguntas al azar y mezcla las respuestas
function getRandomQuestions(pool = [], count = 5) {
  const seleccionadas = [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  return seleccionadas.map(q => ({
    pregunta: q.pregunta,
    respuestas: [...q.respuestas].sort(() => Math.random() - 0.5),
    correcta: q.correcta
  }));
}

// 8) Ruta POST /preguntas
app.post('/preguntas', async (req, res) => {
  const { tema } = req.body;
  const pool = PREGUNTAS_EJEMPLO[tema] || [];
  const demo = getRandomQuestions(pool, 5);

  // Guarda en Mongo (opcional)
  await Promise.all(demo.map(item =>
    Pregunta.create({
      tema,
      pregunta: item.pregunta,
      respuestas: item.respuestas,
      correcta: item.correcta
    })
  ));

  return res.json({ preguntas: demo });
});

// 9) Arranque del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
