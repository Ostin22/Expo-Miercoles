const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwt = require("jsonwebtoken"); // Asegúrate de importar jwt
const Usuario = require("../models/usuario"); // Asegúrate de importar el modelo Usuario

// Rutas
router.post("/login", authController.loginUsuario);
router.post("/registro", authController.registrarUsuario);

// Ruta protegida para obtener el perfil del usuario autenticado
router.get("/perfil", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select("-password");

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Error en la ruta /perfil:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


module.exports = router;

