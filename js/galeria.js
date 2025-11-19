// Script para generar la galeria automaticamente

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("galeria-contenedor");

  // Si por lo que sea no existe, pues no hago nada
  if (!contenedor) return;

  // lista con las imagenes de la galería ya que no puedo leer el directorio con JS
  const fotos = [
    "rack1.jpg",
    "rack2.jpg",
    "switch1.jpg",
    "pc-montado1.jpg",
    "tpv1.jpg",
    "cableado1.jpg"
  ];

  // Limpio el mensaje de “cargando…”
  contenedor.innerHTML = "";

  // Creo cada miniatura con lightbox
  fotos.forEach((foto) => {
    // Crear enlace que abre la imagen grande
    const a = document.createElement("a");
    a.href = `img/galeria/${foto}`;
    a.setAttribute("data-lightbox", "satpro-galeria");
    a.className = "gallery-item";

    // Crear la miniatura
    const img = document.createElement("img");
    img.src = `img/galeria/${foto}`;
    img.alt = "Foto de intervención técnica SATPro";

    // Montar
    a.appendChild(img);
    contenedor.appendChild(a);
  });

  lightbox.option({
    resizeDuration: 150,
    wrapAround: true,
    fadeDuration: 200
  });
});
