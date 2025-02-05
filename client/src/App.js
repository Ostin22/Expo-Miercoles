import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RetosList from "./components/RetosList";
import AgregarReto from "./components/AgregarReto";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Perfil from "./components/Perfil"
import SubirPrueba from "./components/SubirPrueba";
import VerFotos
 from "./components/VerFotos";
function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  // Rutas en las que NO queremos mostrar Header y Footer
  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/registro";

  return (
    <>
      {!hideNavAndFooter && <Header auth={auth} setAuth={setAuth} />}
      <main>
        <Routes>
          {/* Rutas Públicas */}
          <Route 
            path="/login" 
            element={
              auth ? <Navigate to="/retos" replace /> : <Login setAuth={setAuth} />
            } 
          />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas Protegidas */}



          <Route
            path="/perfil"
            element={auth ? <Perfil /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/retos"
            element={auth ? <RetosList /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/agregar-reto"
            element={auth ? <AgregarReto /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/apartado-artistico"
            element={auth ? <h2>Aquí irá el componente del apartado artístico</h2> : <Navigate to="/login" replace />}
          />

          <Route path="/retos/:retoId/subir-prueba" element={<SubirPrueba />} />
          <Route path="/retos/:retoId/fotos" element={<VerFotos />} />


          <Route path="/" element={<Navigate to="/retos" replace />} />
          <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;