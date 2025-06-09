import { Link } from "react-router-dom";
import { FaHome  } from "react-icons/fa";
const Inicio = () => {
  return (
    <div className="contenido">
      <header className="encabezado">
        <h3>Sistema de Inscripciones</h3>
      </header>
      <h1>¡Bienvenido al Portal de Inscripciones!</h1>
      <p>
       ¡Bienvenido! Desde aquí podés gestionar todas tus suscripciones digitales: Netflix, Spotify, Amazon, Disney+ y más. Consultá tu historial, organizá tus servicios y llevá el control en un solo lugar.
      </p>
      <Link to="/home/crear" className="btn-inscripcion">Iniciar inscripción</Link>
    </div>
  );
};
export default Inicio;  