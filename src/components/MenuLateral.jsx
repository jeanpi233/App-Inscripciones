import { FaHome, FaEnvelope,FaClipboardList , FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/inscipcion2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { alertaRedireccion } from "../helpers/funciones";
const MenuLateral = () => {
  let redireccion = useNavigate();
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    alertaRedireccion(redireccion, "Cerrando sesión...", "/");
  }
  return (
    <section className="menu-lateral">
      <h1>Mis suscripciones</h1>
      <h2>{usuario.nombre}</h2>
      <nav className="menu-lateral__nav">
        <Link to="inicio" className="fila"><FaHome />  Inicio</Link>
        <Link to="crear" className="fila"><FaEnvelope />  Crear</Link>
        <Link to="ver" className="fila"><FaClipboardList  /> Ver sub!</Link>
        <buttom  onClick={cerrarSesion}  className="fila"><FaSignOutAlt /> Salir</buttom>
      </nav>
      <img src={logo} alt="Logo Escuela Frontend" />
    </section>
  );
};

export default MenuLateral;
