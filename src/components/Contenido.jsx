import { Outlet } from "react-router-dom";

const Contenido = () => {
  return (
    <div className="contenido">
      <Outlet />
    </div>
  );
};

export default Contenido;