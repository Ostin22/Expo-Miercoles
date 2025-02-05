const mongoose = require('mongoose');

const retoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  puntos: { type: Number, required: true },
  fotoPrueba: { type: String }, // Ruta o URL de la foto de prueba
  estado: { type: String, enum: ["pendiente", "aprobado", "rechazado"], default: "pendiente" }, // Estado del reto
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, // Usuario que completó el reto
  fecha: { type: Date, default: Date.now }, // Fecha en la que se completó el reto
});

// Exportar el modelo
const Reto = mongoose.model("Reto", retoSchema);
module.exports = Reto;
