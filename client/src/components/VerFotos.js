import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VerFotos = () => {
  const { retoId } = useParams(); // Obtiene el ID del reto desde la URL
  const [fotos, setFotos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/retos/${retoId}/fotos`);
        setFotos(response.data);
      } catch (error) {
        console.error("Error al obtener las fotos:", error);
        setError("Error al cargar las fotos. Intenta de nuevo más tarde.");
      }
    };

    fetchFotos();
  }, [retoId]);

  return (
    <div className="ver-fotos-container">
      <h2>Fotos subidas para este reto</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="fotos-grid">
          {fotos.map((foto, index) => (
            <div key={index} className="foto-card">
              <img src={foto.imagenUrl} alt={`Prueba ${index + 1}`} />
              <p>Subido por: {foto.usuarioNombre}</p> {/* Si tienes información del usuario */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerFotos;