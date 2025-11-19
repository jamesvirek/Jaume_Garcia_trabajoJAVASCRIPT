// Script para cargar las noticias desde el JSON externo

document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // Si por lo que sea no encuentra el contenedor, no hacemos nada
  if (!newsContainer) return;

  // Cargar el JSON de noticias
  fetch("data/noticias.json")
    .then((res) => {
      // Si falla (ruta mal, archivo mal puesto, etc)
      if (!res.ok) {
        throw new Error("Error al cargar las noticias");
      }
      return res.json();
    })
    .then((noticias) => {
      // Aqui pintamos las noticias en la pagina
      pintarNoticias(noticias, newsContainer);
    })
    .catch((err) => {
      // Si algo peta, pongo un mensaje para no dejarlo vacio
      console.error(err);
      newsContainer.innerHTML =
        '<p class="news-error">No se han podido cargar las noticias ahora mismo.</p>';
    });
});

// Funcion que genera las tarjetas de noticias
function pintarNoticias(lista, container) {
  // Primero limpio el contenido previo
  container.innerHTML = "";

  // Si el JSON esta vacio (por si acaso)
  if (!Array.isArray(lista) || lista.length === 0) {
    container.innerHTML =
      '<p class="news-error">De momento no hay noticias nuevas.</p>';
    return;
  }

  // Miro cada noticia y creo su tarjetita
  lista.forEach((item) => {
    const card = document.createElement("article");
    card.className = "news-card";

    // Titulo
    const title = document.createElement("h3");
    title.textContent = item.titulo || "Aviso";

    // Fecha
    const meta = document.createElement("div");
    meta.className = "news-meta";
    meta.textContent = item.fecha || "";

    // Texto descriptivo
    const body = document.createElement("p");
    body.textContent = item.descripcion || "";

    // Montarlo
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(body);

    container.appendChild(card);
  });
}
