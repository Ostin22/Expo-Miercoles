const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  puntos: { type: Number, default: 0 },
  retosCompletados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reto" }],
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
