let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();
let RetosRoutes = require('./routes/retoRoutes');
const authRoutes = require("./routes/authRoutes");
require('dotenv').config(); // Asegura que dotenv está cargado


let port = process.env.PORT || 4000;

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001", ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

// Conexión a MongoDB
async function connectDB(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/challenge');
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
}
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/retos', RetosRoutes);


//Autenticacion

app.use('/auth', authRoutes);

app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`[${Object.keys(middleware.route.methods).join(",").toUpperCase()}] ${middleware.route.path}`);
    }
});


// Manejador de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});


// Servidor
app.listen(port, () => {
    console.log(` Servidor backend corriendo en el puerto: ${port}`);
});

