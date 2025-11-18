document.addEventListener("DOMContentLoaded", () => {
  // Año dinámico en el footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Aquí podrías añadir en el futuro:
  // - Efectos de scroll
  // - Activar enlaces de navegación según sección
  // - Etc.
});
