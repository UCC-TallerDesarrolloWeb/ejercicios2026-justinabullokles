/**
 * Convierte una medida ingresada a metros, pulgadas, pies y yardas.
 * Actualiza automáticamente los valores de los demás campos.
 *
 * @method convertirUnidades
 * @param {string} valor - Valor ingresado por el usuario.
 * @param {string} unidad - ID de la unidad modificada.
 * @returns {void} No retorna un valor, actualiza los campos del HTML.
 */

const convertirUnidades = (valor, unidad) => {
  let numero = Number(valor.replace(",", "."));
  let metros = "",
    pulgadas = "",
    pies = "",
    yardas = "";

  if (valor.trim() === "" || !Number.isFinite(numero)) {
    alert("Ingresá un número válido");
  } else {
    if (unidad === "metro") {
      metros = numero;
    } else if (unidad === "pulgada") {
      metros = numero * 0.0254;
    } else if (unidad === "pie") {
      metros = numero * 0.3048;
    } else if (unidad === "yarda") {
      metros = numero * 0.9144;
    }

    pulgadas = (metros / 0.0254).toFixed(2);
    pies = (metros / 0.3048).toFixed(2);
    yardas = (metros / 0.9144).toFixed(2);
    metros = metros.toFixed(2);
  }

  document.getElementById("metro").value = metros;
  document.getElementById("pulgada").value = pulgadas;
  document.getElementById("pie").value = pies;
  document.getElementById("yarda").value = yardas;
};

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

/**
 * Muestra u oculta un div según la opción seleccionada.
 * @param {string} valor - Valor del radio button seleccionado.
 * @returns {void} Modifica la visibilidad del div.
 */
const mostrarOcultarDiv = (valor) => {
  if (valor === "val_mostrar") {
    document.getElementById("unDiv").style.display = "block";
  } else {
    document.getElementById("unDiv").style.display = "none";
  }
};

/**
 * Abre el dialog con los detalles del producto.
 * @returns {void}
 */

/**
 * Muestra el detalle del producto seleccionado.
 * @param {number} indice - Posición del producto en el array.
 * @returns {void} Actualiza y abre el dialog.
 */
const mostrarDetalleProducto = (indice) => {
  let producto = productos[indice];

  let contenido = `
        <h2>${producto.nombre}</h2>

        <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
             alt="${producto.nombre}">

        <p>${producto.description}</p>
        <p>Marca: ${producto.marca}</p>
        <p>Categoría: ${producto.categoria}</p>
        <p>Talles: ${producto.talle.join(", ")}</p>
       <p>Precio: ${formatearPrecio(producto.precio)}</p>
    `;

  document.getElementById("contenidoDetalle").innerHTML = contenido;
  document.getElementById("detalleProducto").showModal();
};

/**
 * Cierra el dialog del producto.
 * @returns {void}
 */
const cerrarDetalleProducto = () => {
  document.getElementById("detalleProducto").close();
};

/**
 * Realiza una operación matemática entre dos números.
 * @param {string} id1 - ID del primer número.
 * @param {string} id2 - ID del segundo número.
 * @param {string} idResultado - ID del campo resultado.
 * @param {string} operacion - Operación que se realizará.
 * @returns {void} Actualiza el resultado en el HTML.
 */
/**
 * Realiza una operación matemática entre dos números.
 * Muestra el resultado utilizando innerHTML.
 *
 * @param {string} id1 - ID del primer número.
 * @param {string} id2 - ID del segundo número.
 * @param {string} idResultado - ID del resultado.
 * @param {string} operacion - Operación matemática.
 * @returns {void} Actualiza el resultado en el HTML.
 */
const calcularOperacion = (id1, id2, idResultado, operacion) => {
  let valor1 = document.getElementById(id1).value;
  let valor2 = document.getElementById(id2).value;
  let resultado = document.getElementById(idResultado);

  if (valor1.trim() === "" || valor2.trim() === "") {
    resultado.innerHTML = "";
    return;
  }

  let num1 = Number(valor1);
  let num2 = Number(valor2);

  if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
    alert("Ingresá números válidos");
    resultado.innerHTML = "";
    return;
  }

  if (operacion === "+") {
    resultado.innerHTML = num1 + num2;
  } else if (operacion === "-") {
    resultado.innerHTML = num1 - num2;
  } else if (operacion === "*") {
    resultado.innerHTML = num1 * num2;
  } else if (operacion === "/") {
    if (num2 === 0) {
      resultado.innerHTML = "No se puede dividir por cero";
    } else {
      resultado.innerHTML = num1 / num2;
    }
  }
};
