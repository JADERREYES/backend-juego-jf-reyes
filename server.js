// Backend/server.js

require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

const app = express();
app.use(express.json());

// Monta las rutas bajo /api
app.use('/api', require('./src/routes/generate.routes'));

app.get('/', (req, res) => res.send('¡Servidor funcionando!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
Pregunta.jsx
jsx
Copiar
Editar
