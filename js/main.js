document.addEventListener("DOMContentLoaded", () => {
  // Año dinamico en el footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
