import Home from "../Home";
import Login from "../pages/Login";
import Crear from "../pages/Crear";
import Ver from "../pages/Ver";
import Inicio from "../pages/inicio";
import EditarSub from "../pages/EditarSub";

export let Enrutador = [
  {
    path: "/home/",
    element: <Home />,
    children: [
      {
        path: "inicio",
        element: <Inicio />,
      },
      {
        path: "crear",
        element: <Crear />,
      },
      {
        path: "ver",
        element: <Ver />,
      },
      {
        path: "editar/:id",
        element: <EditarSub />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
];
