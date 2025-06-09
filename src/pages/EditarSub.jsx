import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarSub.css";
import { alertaRedireccion } from "../helpers/funciones";

const apiInscripciones = "https://apiprueba-awm8.onrender.com/inscripciones";

const EditarSub = () => {
  const { id } = useParams();
  const redireccion = useNavigate();

  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    fetch(`${apiInscripciones}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre);
        setCosto(data.costo);
        setCategoria(data.categoria);
        setFecha(data.fecha);
      })
      .catch((err) => console.error("Error al cargar inscripción:", err));
  }, [id]);

  const editar = () => {
    const idUsuario = JSON.parse(localStorage.getItem("usuario"))?.id || null;
    if (!idUsuario) return alert("No se encontró el usuario.");

    const editarInscripcion = {
      id: parseInt(id),
      idUsuario,
      nombre,
      costo,
      categoria,
      fecha,
    };

    fetch(`${apiInscripciones}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editarInscripcion),
    })
      .then((res) => res.json())
      .then(() => {
        alertaRedireccion(redireccion, "Sub editada", "/home/ver");
      })
      .catch((error) => console.error("Error al editar:", error));
  };

  return (
    <form
      className="form_sub"
      onSubmit={(e) => {
        e.preventDefault();
        editar();
      }}
    >
      <span className="titulo_sub">Editar suscripción</span>
      <p className="descripcion_sub">
        Modifica los campos que desees actualizar y guarda los cambios.
      </p>
      <div>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del servicio"
          type="text"
          name="nombre"
        />
      </div>
      <div>
        <input
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          placeholder="Costo mensual ($)"
          type="number"
          name="costo"
        />
      </div>
      <div>
        <input
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Categoría"
          type="text"
          name="categoria"
        />
      </div>
      <div>
        <input
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          placeholder="Fecha de renovación"
          type="text"
          name="fecha"
        />
      </div>
      <div>
        <button type="submit">Guardar Cambios</button>
      </div>
    </form>
  );
};

export default EditarSub;
