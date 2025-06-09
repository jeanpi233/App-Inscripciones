import { Navigate } from "react-router-dom";

function RutaProtegida({ componente }) {
  let token = localStorage.getItem("token");
  if (token) {
    return componente;
  } else {
    return <Navigate to="/" />;
  }
}

export default RutaProtegida;
