

/**
 * Convierte una medida ingresada a metros, pulgadas, pies y yardas.
 * Actualiza automáticamente los valores de los demás campos.
 *
 * @method convertirUnidades
 * @param {string} valor - Valor ingresado por el usuario.
 * @param {string} unidad - ID de la unidad modificada.
 * @returns {void} No retorna un valor, actualiza los campos del HTML.
 */

function convertirUnidades(valor, unidad) {
  let numero = Number(valor);
  let metros;

  if (valor.trim() === "" || !Number.isFinite(numero)) {
    alert("Ingresá un número válido");
    return;
  }

  if (unidad === "metro") {
    metros = numero;
  } else if (unidad === "pulgada") {
    metros = numero * 0.0254;
  } else if (unidad === "pie") {
    metros = numero * 0.3048;
  } else if (unidad === "yarda") {
    metros = numero * 0.9144;
  }

  document.getElementById("metro").value = metros;
  document.getElementById("pulgada").value = metros / 0.0254;
  document.getElementById("pie").value = metros / 0.3048;
  document.getElementById("yarda").value = metros / 0.9144;
}

/**
 * Convierte grados a radianes y radianes a grados.
 * @param {string} valor - Valor ingresado.
 * @param {string} unidad - Campo que fue modificado.
 * @returns {void} Actualiza el campo correspondiente.
 */
function convertirGradosRadianes(valor, unidad) {
  let numero = Number(valor);

  if (valor.trim() === "" || !Number.isFinite(numero)) {
    alert("Ingresá un número válido");
    return;
  }

  if (unidad === "grados") {
    document.getElementById("radianes").value = (numero * Math.PI) / 180;
  } else if (unidad === "radianes") {
    document.getElementById("grados").value = (numero * 180) / Math.PI;
  }
}
