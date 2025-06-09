import Swal from "sweetalert2";

// 🔁 Redirección con cuenta regresiva
export function alertaRedireccion(redireccion, mensaje, ruta) {
  let timerInterval;
  Swal.fire({
    title: mensaje,
    html: "Será redireccionado en <b></b> milisegundos.",
    timer: 1500,
    icon: "success",
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      redireccion(ruta);
    },
  });
}

// 💬 Alerta genérica con ícono
export function alertaGeneral(titulo, mensaje, icono) {
  Swal.fire({
    icon: icono,
    title: titulo,
    text: mensaje,
  });
}

// 🧨 ALERTA DE CONFIRMACIÓN CON ELIMINACIÓN
export function alertaConfirmar(id, api, actualizarDatos) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${api}/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al eliminar");

          Swal.fire({
            title: "¡Eliminado!",
            text: "La suscripción fue eliminada correctamente.",
            icon: "success",
          });

          actualizarDatos(); // recarga los datos actualizados
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la suscripción.",
            icon: "error",
          });
        });
    }
  });
}

// 🔐 Token aleatorio
export function generarToken() {
  let token =
    "token_" +
    Math.random().toString(36).substring(2) +
    "-" +
    Math.random().toString(36).substring(2);
  return token;
}
