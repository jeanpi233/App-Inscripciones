import { useState, useEffect, useRef } from "react";
import "./Ver.css";
import { Link } from "react-router-dom";
import { alertaConfirmar } from "../helpers/funciones";

let apiInscripciones = "https://apiprueba-awm8.onrender.com/inscripciones";

const Ver = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
  const idusuario = usuario.id || "";

  const [inscripciones, setInscripciones] = useState([]);
  const contenedorRef = useRef(null);

  function cargarDatos() {
    fetch(apiInscripciones)
      .then((res) => res.json())
      .then((data) => {
        const delUsuario = data.filter(
          (i) => String(i.idUsuario).trim() === String(idusuario).trim()
        );
        setInscripciones(delUsuario);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    cargarDatos();
  }, [idusuario]);

  function eliminarSub(id) {
    alertaConfirmar(id, apiInscripciones, cargarDatos);
  }

  return (
    <>
      {inscripciones.length === 0 ? (
        <div className="contenedorTextoVer">
          <p className="descripcion1">No hay inscripciones para este usuario.</p>
        </div>
      ) : (
        <ul className="contenedor_tarjetas" ref={contenedorRef}>
          {inscripciones.map((inscripcion) => (
            <li key={inscripcion.id} className="tarjeta">
              <div className="contenido_tarjeta">
                <div className="titulo">{inscripcion.nombre}</div>
                <div className="precio">${inscripcion.costo} / mes</div>
                <div className="descripcion">
                  <p><strong>Categoría:</strong> {inscripcion.categoria}</p>
                  <p><strong>Renovación:</strong> {new Date(inscripcion.fecha).toLocaleDateString()}</p>
                  <p><strong>Descripción:</strong> Detalles de la suscripción.</p>
                </div>
              </div>
              <Link to={`/home/editar/${inscripcion.id}`} className="button">Editar</Link>
              <button className="button" onClick={() => eliminarSub(inscripcion.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Ver;
