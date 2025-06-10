
import { useState } from "react";
import { FaHome, FaEnvelope, FaClipboardList, FaSignOutAlt, FaBars } from "react-icons/fa";
import logo from "../assets/inscipcion2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { alertaRedireccion } from "../helpers/funciones";

const MenuLateral = () => {
  const [abierto, setAbierto] = useState(false);
  const redireccion = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    alertaRedireccion(redireccion, "Cerrando sesión...", "/");
  }

  function toggleMenu() {
    setAbierto(!abierto);
  }

  return (
    <>
      {/* Botón hamburguesa visible solo en móvil */}
      <button className="hamburguesa" onClick={toggleMenu}>
        <FaBars />
      </button>

      <section className={`menu-lateral ${abierto ? "activo" : ""}`}>
        <h1>Mis suscripciones</h1>
        <h2>{usuario?.nombre}</h2>

        <nav className="menu-lateral__nav">
          <Link to="inicio" className="fila" onClick={() => setAbierto(false)}><FaHome /> Inicio</Link>
          <Link to="crear" className="fila" onClick={() => setAbierto(false)}><FaEnvelope /> Crear</Link>
          <Link to="ver" className="fila" onClick={() => setAbierto(false)}><FaClipboardList /> Ver sub!</Link>
          <button onClick={cerrarSesion} className="fila"><FaSignOutAlt /> Salir</button>
        </nav>

        <img src={logo} alt="Logo Escuela Frontend" />
      </section>
    </>
  );
};

export default MenuLateral;
