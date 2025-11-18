// Script del formulario de presupuesto
// Aqui valido los campos de contacto i calculo el total del presupuesto en vivo

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-presupuesto");
  if (!form) return;
  const inputNombre = document.getElementById("nombre");
  const inputApellidos = document.getElementById("apellidos");
  const inputTelefono = document.getElementById("telefono");
  const inputEmail = document.getElementById("email");

  const selectProducto = document.getElementById("producto");
  const inputPlazo = document.getElementById("plazo");
  const extrasChecks = document.querySelectorAll(".extra-check");

  const inputTotal = document.getElementById("presupuestoTotal");
  const detalleDescuento = document.getElementById("detalle-descuento");

  const checkAcepto = document.getElementById("acepto");

  // Funciones de validacion de cada campo
  function validarNombre() {
    const valor = inputNombre.value.trim();
    const error = document.getElementById("error-nombre");

    // Solo letras (incluyo acentos i Ñ) i maximo 15
    const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{1,15}$/;

    if (!valor) {
      error.textContent = "El nombre es obligatorio.";
      return false;
    }
    if (!regex.test(valor)) {
      error.textContent = "Solo letras i máximo 15 caracteres.";
      return false;
    }

    error.textContent = "";
    return true;
  }

  function validarApellidos() {
    const valor = inputApellidos.value.trim();
    const error = document.getElementById("error-apellidos");
    const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{1,40}$/;

    if (!valor) {
      error.textContent = "Los apellidos son obligatorios.";
      return false;
    }
    if (!regex.test(valor)) {
      error.textContent = "Solo letras i máximo 40 caracteres.";
      return false;
    }

    error.textContent = "";
    return true;
  }

  function validarTelefono() {
    const valor = inputTelefono.value.trim();
    const error = document.getElementById("error-telefono");
    const regex = /^[0-9]{9}$/;

    if (!valor) {
      error.textContent = "El teléfono es obligatorio.";
      return false;
    }
    if (!regex.test(valor)) {
      error.textContent = "El teléfono deben ser 9 dígitos.";
      return false;
    }

    error.textContent = "";
    return true;
  }

  function validarEmail() {
    const valor = inputEmail.value.trim();
    const error = document.getElementById("error-email");
    // Formato sencillo tipo nombre@dominio.ext
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!valor) {
      error.textContent = "El email es obligatorio.";
      return false;
    }
    if (!regex.test(valor)) {
      error.textContent = "Formato de correo no válido.";
      return false;
    }

    error.textContent = "";
    return true;
  }

  function validarProducto() {
    const error = document.getElementById("error-producto");
    if (!selectProducto.value) {
      error.textContent = "Selecciona un servicio.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validarPlazo() {
    const valor = inputPlazo.value.trim();
    const numero = Number(valor);
    const error = document.getElementById("error-plazo");

    if (!valor) {
      error.textContent = "Indica el plazo en días.";
      return false;
    }
    if (isNaN(numero) || numero < 1) {
      error.textContent = "El plazo debe ser un número mayor o igual a 1.";
      return false;
    }

    error.textContent = "";
    return true;
  }

  function validarAcepto() {
    const error = document.getElementById("error-acepto");
    if (!checkAcepto.checked) {
      error.textContent = "Debes aceptar la política de privacidad.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  // Funcion que calcula el presupuesto total segun:
  // producto seleccionado + extras + descuento por plazo
  function recalcularPresupuesto() {
    // Si no hay producto todavia, dejo el mensaje por defecto
    if (!selectProducto.value) {
      inputTotal.value = "0 €";
      detalleDescuento.textContent =
        "Selecciona servicio, plazo i extras para ver el total.";
      return;
    }

    // Precio base del producto (lo saco del data-precio)
    const opcionSeleccionada =
      selectProducto.options[selectProducto.selectedIndex];
    const precioBase = Number(opcionSeleccionada.dataset.precio || 0);

    // Suma de extras
    let totalExtras = 0;
    extrasChecks.forEach((chk) => {
      if (chk.checked) {
        totalExtras += Number(chk.dataset.precio || 0);
      }
    });

    // Plazo i descuento
    const dias = Number(inputPlazo.value || 0);
    let descuentoPorc = 0;

    if (dias >= 3 && dias <= 5) {
      descuentoPorc = 5;
    } else if (dias >= 6) {
      descuentoPorc = 10;
    }

    let subtotal = precioBase + totalExtras;
    const importeDescuento = (subtotal * descuentoPorc) / 100;
    const totalFinal = subtotal - importeDescuento;

    // Actualizar el campo de texto del total
    inputTotal.value = `${totalFinal.toFixed(2)} €`;

    // Mensajito de detalle segun el descuento aplicado
    if (descuentoPorc > 0) {
      detalleDescuento.textContent =
        `Incluye un ${descuentoPorc}% de descuento por plazo (${dias} día/s).`;
    } else {
      detalleDescuento.textContent =
        "Sin descuento por plazo. Si el periodo es más largo, aplico descuento.";
    }
  }

  // Eventos para validar en tiempo real (on the fly)
  inputNombre.addEventListener("blur", validarNombre);
  inputApellidos.addEventListener("blur", validarApellidos);
  inputTelefono.addEventListener("blur", validarTelefono);
  inputEmail.addEventListener("blur", validarEmail);

  selectProducto.addEventListener("change", () => {
    validarProducto();
    recalcularPresupuesto();
  });

  inputPlazo.addEventListener("input", () => {
    validarPlazo();
    recalcularPresupuesto();
  });

  extrasChecks.forEach((chk) => {
    chk.addEventListener("change", recalcularPresupuesto);
  });

  // Validacion global al enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evito el envio real para controlarlo yo

    const okNombre = validarNombre();
    const okApellidos = validarApellidos();
    const okTelefono = validarTelefono();
    const okEmail = validarEmail();
    const okProducto = validarProducto();
    const okPlazo = validarPlazo();
    const okAcepto = validarAcepto();

    // Recalculo por si acaso alguien no ha tocado algo
    recalcularPresupuesto();

    // Solo si todo esta correcto, simulo el "envio"
    if (okNombre && okApellidos && okTelefono && okEmail &&
        okProducto && okPlazo && okAcepto) {
      // Aqui podria hacer un alert o mostrar un mensaje de que todo ok
      alert("Solicitud enviada correctamente. En breve contactaremos contigo.");
      form.reset();
      // Reseteo el total tambien
      inputTotal.value = "0 €";
      detalleDescuento.textContent =
        "Selecciona servicio, plazo i extras para ver el total.";
    }
  });
});

    