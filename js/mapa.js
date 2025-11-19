// Script del mapa de contacto
// Uso Leaflet + Leaflet Routing Machine para no complicarme con APIs
// Mapa con OpenStreetMap i ruta desde la ubicacion del usuario hasta SATPro, hay que dar permiso al navegador

document.addEventListener("DOMContentLoaded", () => {
  const mapaDiv = document.getElementById("mapa-satpro");
  const btnRuta = document.getElementById("btn-ruta");
  const mensaje = document.getElementById("mapa-mensaje");

  // Si por lo que sea no existe el div del mapa, no hago nada
  if (!mapaDiv) return;

  // Coordenadas aproximadas de la oficina (Madrid centro)
  const satproLatLng = [40.4168, -3.7038];

  // Inicializar el mapa con Leaflet
  const mapa = L.map("mapa-satpro").setView(satproLatLng, 13);

  // Capa base de OpenStreetMap (gratuita)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(mapa);

  // Marcador en la oficina de SATPro
  L.marker(satproLatLng)
    .addTo(mapa)
    .bindPopup("SATPro IT Services<br>C/ Ejemplo 123<br>Madrid")
    .openPopup();

  // Variable para guardar el control de ruta, asi lo puedo borrar si recalculo
  let controlRuta = null;

  // Funcion para crear la ruta desde origen hasta SATPro
  function crearRuta(origenLatLng) {
    // Si ya habia una ruta dibujada, la quito
    if (controlRuta) {
      mapa.removeControl(controlRuta);
    }

    // Leaflet Routing Machine usando el servidor por defecto
    controlRuta = L.Routing.control({
      waypoints: [
        L.latLng(origenLatLng[0], origenLatLng[1]),
        L.latLng(satproLatLng[0], satproLatLng[1])
      ],
      routeWhileDragging: false,
      show: false,
      language: "es"
    }).addTo(mapa);

    mensaje.textContent =
      "Ruta calculada desde tu ubicación aproximada hasta SATPro.";
  }

  // Al hacer clic en el boton, pido la geolocalizacion al usuario
  btnRuta.addEventListener("click", () => {
    if (!navigator.geolocation) {
      mensaje.textContent =
        "Tu navegador no soporta geolocalización. Solo se muestra la ubicación de SATPro.";
      return;
    }

    mensaje.textContent = "Buscando tu ubicación...";

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const origenLatLng = [lat, lng];

        // Muevo el mapa para que se vea bien la ruta
        mapa.setView(origenLatLng, 12);

        // Creo un marcador en la posicion del usuario
        L.marker(origenLatLng)
          .addTo(mapa)
          .bindPopup("Tu ubicación aproximada")
          .openPopup();

        // Dibujo la ruta con la funcion de arriba
        crearRuta(origenLatLng);
      },
      (err) => {
        console.error(err);
        mensaje.textContent =
          "No se ha podido obtener tu ubicación (has cancelado o ha fallado). Solo se muestra SATPro.";
      }
    );
  });
});
