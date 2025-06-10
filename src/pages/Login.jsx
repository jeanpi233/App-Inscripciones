import { useNavigate } from "react-router-dom";
import "./Login.css";
import {
  alertaGeneral,
  alertaRedireccion,
  generarToken,
} from "../helpers/funciones";
import { useState, useEffect } from "react";
let apiusuarios = "https://apiprueba-awm8.onrender.com/usuarios";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  let redireccion = useNavigate();

  function cargarUsuarios() {
    fetch(apiusuarios)
      .then((Response) => Response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    cargarUsuarios();
  }, []);

  function buscarUsuario() {
    let usuarioEncontrado = usuarios.find(
      (user) => nombre === user.nombre && contraseña === user.contraseña
    );
    return usuarioEncontrado;
  }

  function iniciarSesion() {
    if (buscarUsuario()) {
      let token = generarToken();
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(buscarUsuario()));
      alertaRedireccion(redireccion, "Bienvenido", "/home/inicio");
    } else {
      alertaGeneral("Error", "Usuario o contraseña incorrectos", "error");
    }
  }

  function registrarUsuario() {
    let nuevoUsuario = usuarios.some(
      (user) => nombre === user.nombre && correo === user.correo
    );
    if (nuevoUsuario) {
      alertaGeneral("Error", "usuario ya eiste", "error");
    } else {
      let usuario = {
        nombre: nombre,
        correo: correo,
        contraseña: contraseña,
      };
      fetch(apiusuarios, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      })
      .then((res) => res.json())
      .then((usuarioCreado) => {
        let token = generarToken();
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuarioCreado));
        alertaRedireccion(
          redireccion,
          "usuario registrado con eito",
          "/home/inicio"
        );
      });
    }
  }

  return (
    <div className="contenedor-login">
      <input type="checkbox" id="switch" hidden />
      <div className="caja">
        <div className="panel"></div>

        <form className="formulario formulario-registro">
          <h2>Registro</h2>
          <p>Regístrate ahora y obtén acceso completo.</p>
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
            required
          />
          <input
            onChange={(e) => setCorreo(e.target.value)}
            type="email"
            placeholder="Correo"
            required
          />
          <input
            onChange={(e) => setContraseña(e.target.value)}
            type="password"
            placeholder="Contraseña"
            required
          />
          <button type="button" onClick={registrarUsuario}>
            Registrarse
          </button>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <label htmlFor="switch">Iniciar sesión</label>
          </p>
        </form>

        <form className="formulario formulario-login">
          <h2>Iniciar sesión</h2>
          <p>Inicia sesión ahora y obtén acceso completo.</p>
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre"
            required
          />
          <input
            onChange={(e) => setContraseña(e.target.value)}
            type="password"
            placeholder="Contraseña"
            required
          />
          <button type="button" onClick={iniciarSesion}>
            Iniciar sesion
          </button>
          <p>
            ¿No tienes cuenta? <label htmlFor="switch">Registrarse</label>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;