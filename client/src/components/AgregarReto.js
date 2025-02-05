import React, { useState } from 'react';
import './AgregarReto.css'; // Asegúrate de importar el archivo CSS

function AgregarReto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [puntos, setPuntos] = useState('');

  const guardarDatos = async () => {
    if (!nombre || !descripcion || !puntos) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const body = { nombre, descripcion, puntos };

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/retos/agregarreto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('Reto guardado exitosamente');
        setNombre('');
        setDescripcion('');
        setPuntos('');
      } else {
        alert('Error al guardar el reto');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="subir-prueba-form">
        <h2>Agregar reto</h2>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del reto"
        />
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del reto"
        />
        <input
          type="text"
          value={puntos}
          onChange={(e) => setPuntos(e.target.value)}
          placeholder="Puntos del reto"
        />
        <button onClick={guardarDatos}>Guardar Reto</button>
      </div>
    </div>
  );
}

export default AgregarReto;
