let express = require('express');
let router = express.Router();
let retoController = require('../controllers/retoController');
const Reto = require("../models/reto");
const multer = require("multer");
const path = require("path");
// Rutas
router.post('/agregarreto', retoController.AgregarReto);
router.get('/api/todos', retoController.obtenerTodosLosRetos);
router.get('/api/todos/:id', async (req, res) => {
    try {
        let reto = await Reto.findById(req.params.id);
        if (!reto) return res.status(404).json({ message: "Reto no encontrado" });
        res.json(reto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el reto" });
    }
});


// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  
  router.post("/subir-prueba", upload.single("imagen"), async (req, res) => {
    const { userId, retoId } = req.body;
    const imagen = req.file.filename;
  
    try {
      const retoCumplido = new RetoCumplido({ userId, retoId, imagen, aprobado: false });
      await retoCumplido.save();
      res.json({ message: "Prueba subida correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al subir la prueba" });
    }
  });



// Obtener todos los retos pendientes
router.get("/pendientes", async (req, res) => {
  try {
    const retosPendientes = await Reto.find({ estado: "pendiente" }).populate("usuario", "nombre email");
    res.json(retosPendientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener retos pendientes" });
  }
});

// Aprobar un reto y sumar puntos al usuario
router.post("/aprobar/:id", async (req, res) => {
  try {
    const reto = await Reto.findById(req.params.id);
    if (!reto) return res.status(404).json({ message: "Reto no encontrado" });

    // Actualizar estado del reto a "aprobado"
    reto.estado = "aprobado";
    await reto.save();

    // Sumar puntos al usuario
    const usuario = await Usuario.findById(reto.usuario);
    if (usuario) {
      usuario.puntos += reto.puntos;
      await usuario.save();
    }

    res.json({ message: "Reto aprobado y puntos sumados" });
  } catch (error) {
    res.status(500).json({ message: "Error al aprobar el reto" });
  }
});

// Rechazar un reto (sin sumar puntos)
router.post("/rechazar/:id", async (req, res) => {
  try {
    const reto = await Reto.findById(req.params.id);
    if (!reto) return res.status(404).json({ message: "Reto no encontrado" });

    // Actualizar estado del reto a "rechazado"
    reto.estado = "rechazado";
    await reto.save();

    res.json({ message: "Reto rechazado" });
  } catch (error) {
    res.status(500).json({ message: "Error al rechazar el reto" });
  }
});

``



module.exports = router;
