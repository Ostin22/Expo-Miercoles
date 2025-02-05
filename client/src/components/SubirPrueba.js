import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./SubirPrueba.css"; // Importar estilos

const SubirPrueba = () => {
  const { retoId } = useParams();
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) {
      setMensaje("Por favor, selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", imagen);

    try {
      const response = await axios.post(
        `http://localhost:4000/retos/${retoId}/subir-prueba`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setMensaje("Imagen subida exitosamente.");
        navigate(`/retos/${retoId}/fotos`);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setMensaje("Error al subir la imagen. Intenta de nuevo.");
    }
  };

  return (
    <div className="subir-prueba-container">
      <form className="subir-prueba-form" onSubmit={handleSubmit}>
        <h2>Subir prueba del reto</h2>
        <input type="file" accept="image/*" onChange={handleImagenChange} required />
        <button type="submit">Subir imagen</button>
        {mensaje && <p className="subir-prueba-mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default SubirPrueba;
