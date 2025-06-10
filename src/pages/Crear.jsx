import "./Crear.css";
import { useEffect, useState } from "react";
import { alertaRedireccion, alertaGeneral} from "../helpers/funciones";
import { useNavigate } from "react-router-dom";
 let apiInscripciones = "https://apiprueba-awm8.onrender.com/inscripciones";


const Crear = () => {
  let redireccion = useNavigate();
  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [inscripciones, setInscripciones] = useState([]);

  function cargarInscripciones() {
    fetch(apiInscripciones)
      .then((Response) => Response.json())
      .then((data) => setInscripciones(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    cargarInscripciones();
  }, []);

  function crearSub() {
    let idUser = JSON.parse(localStorage.getItem("usuario")).id;
    let nuevaInscripcion = {
      idUsuario: idUser,
      nombre: nombre,
      costo: costo,
      categoria: categoria,
      fecha: fecha,
    };
    if(!nombre || !costo || !categoria || !fecha) {
      alertaGeneral("Error","Completa todos los campos","error")
    } else {
      fetch(apiInscripciones, {
      method: "POST",
      body: JSON.stringify(nuevaInscripcion),
    }).then((response) => response.json())
      .then(() => {
        cargarInscripciones();
        setNombre("");
        setCosto("");
        setCategoria("");
        setFecha("");
        alertaRedireccion(redireccion, "sub registrada", "/home/ver");
      })
      .catch((error) => console.log(error));
    }
  }


  return (
    <form className="form_sub">
      <span className="titulo_sub">Registrar nueva suscripción</span>
      <p className="descripcion_sub">
        Ingresa los detalles del servicio que estás suscribiendo: nombre, costo,
        categoría y fecha de renovación.
      </p>
      <div>
        <input
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del servicio"
          type="text"
          name="nombre"
          id="nombre-servicio"
        />
      </div>

      <div>
        <input
          onChange={(e) => setCosto(e.target.value)}
          placeholder="Costo mensual ($)"
          type="number"
          name="costo"
          id="costo-servicio"
        />
      </div>

      <div>
        <input
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Categoría (ej. Streaming, Educación...)"
          type="text"
          name="categoria"
          id="categoria-servicio"
        />
      </div>

      <div>
        <input
          onChange={(e) => setFecha(e.target.value)}
          placeholder="Fecha de renovación"
          type="date"
          name="fecha"
          id="fecha-renovacion"
        />
      </div>

      <div>
        <button onClick={crearSub} type="button">Registrar</button>
      </div>
    </form>
  );
};

export default Crear;
