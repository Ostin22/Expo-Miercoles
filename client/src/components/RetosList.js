import React, { useState, useEffect } from "react";
import "./RetosList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Valor por defecto

function RetosList() {
  const [retos, setRetos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRetos = async () => {
      try {
        const response = await fetch(`${API_URL}/retos/api/todos`);
        if (!response.ok) {
          throw new Error("No se pudieron cargar los retos");
        }
        const data = await response.json();
        setRetos(data);
      } catch (error) {
        console.error("Error al obtener los retos:", error);
        setError("Error al cargar los retos. Intenta de nuevo más tarde.");
      }
    };

    fetchRetos();
  }, []);

  // Configuración del carrusel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const handleCumplirReto = (retoId) => {
    navigate(`/retos/${retoId}/subir-prueba`); // Redirige al formulario de subida de fotos
  };

  return (
    <div>
      <div id="todosLosRetos">
        <Slider {...sliderSettings} className="slider">
          <div>
            <img src="/static/paisaje1.jpg" alt="Paisaje 1" />
          </div>
          <div>
            <img src="/static/paisaje2.jpg" alt="Paisaje 2" />
          </div>
          <div>
            <img src="/static/paisaje3.jpg" alt="Paisaje 3" />
          </div>
        </Slider>
        <h2 id="tituloPagina">Todos los retos</h2>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="retos-grid">
            {retos.map((reto) => (
              <div key={reto._id} className="reto-card">
                <h3 className="reto-titulo">{reto.nombre}</h3>
                <p className="reto-descripcion">{reto.descripcion}</p>
                <p className="reto-puntos">Puntos: {reto.puntos}</p>
                <button
                  className="reto-enlace"
                  onClick={() => handleCumplirReto(reto._id)}
                >
                  Cumple el reto
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RetosList;