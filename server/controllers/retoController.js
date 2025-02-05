let Reto = require('../models/reto');

// Agregar Reto
exports.AgregarReto = async (req, res) => {
    console.log('Request recibida', req.body);
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const puntos = req.body.puntos;

    if (!nombre.trim() || !descripcion.trim() || puntos === undefined) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    let reto = new Reto({ nombre, descripcion, puntos });
    try {
        await reto.save();
        console.log('✅ Se guardó el reto correctamente', reto);
        res.status(201).json({ message: 'El reto se ha guardado correctamente', reto });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Error al guardar el reto.' });
    }
};

// Obtener todos los retos
exports.obtenerTodosLosRetos = async (req, res) => {
    try {
        const retos = await Reto.find();
        res.status(200).json(retos);
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: 'Error al obtener los retos' });
    }
};
