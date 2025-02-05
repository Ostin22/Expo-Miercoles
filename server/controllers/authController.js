const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Validar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    usuario = new Usuario({ nombre, email, password: hashedPassword });
    await usuario.save();

    // Generar JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, usuario: { id: usuario._id, nombre, email, puntos: usuario.puntos } });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  
  console.log("📌 Se ha llamado a loginUsuario con:", req.body);

  const { email, password } = req.body;

  try {
    console.log("🔍 Buscando usuario en la base de datos...");

    // Verificar si el usuario existe
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log("❌ Usuario no encontrado:", email);

      return res.status(400).json({ message: "Credenciales inválidas" });
    }
    console.log("✅ Usuario encontrado:", usuario);

    // Verificar la contraseña
    console.log("🔑 Comparando contraseñas...");

    const esCorrecta = await bcrypt.compare(password, usuario.password);
    if (!esCorrecta) {
      console.log("❌ Contraseña incorrecta para:", email);

      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Generar JWT
    console.log("🛡️ Generando token JWT...");

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log("✅ Usuario autenticado:", email);

    res.status(200).json({ 
      token, 
      usuario: { 
        id: usuario._id, 
        nombre: usuario.nombre, // ✅ Accedemos correctamente a usuario.nombre
        email: usuario.email, 
        puntos: usuario.puntos 
      } 
    });
    
  } catch (error) {
    console.error("❌ Error en loginUsuario:", error);

    res.status(500).json({ message: "Error en el servidor" });
  }
};
