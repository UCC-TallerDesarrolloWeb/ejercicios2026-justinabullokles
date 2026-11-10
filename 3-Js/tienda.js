const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-manos.webp",
  },
];

/**
 * Formatea un precio en pesos argentinos.
 * @param {number} precio - Precio del producto.
 * @returns {string} Precio con formato de moneda argentina.
 */
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(precio);
};

/**
 * Genera dinámicamente las tarjetas de los productos.
 * @returns {void} Muestra los productos en el HTML.
 */
/**
 * Genera las tarjetas de los productos recibidos.
 * @param {Array} lista - Productos que se mostrarán.
 * @returns {void}
 */
const renderizarProductos = (lista = productos) => {
  let tarjetas = "";

  lista.forEach((producto) => {
    // Conservamos el indice original para el dialog y el carrito.
    let indice = productos.indexOf(producto);

    tarjetas += `
            <div>
                <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
                     alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>
                <p>Precio: ${formatearPrecio(producto.precio)}</p>

                <button type="button" onclick="mostrarDetalleProducto(${indice})">
                    Ver detalle de Producto
                </button>

                <button type="button" onclick="agregarAlCarrito(${indice})">
                    Agregar al carrito
                </button>
            </div>
        `;
  });

  document.getElementById("listadoProductos").innerHTML =
    tarjetas || "<p>No se encontraron productos.</p>";
};

/**
 * Filtra los productos por nombre, precio, marca y categoría.
 * @returns {void} Actualiza las tarjetas del catálogo.
 */
const filtrarProductos = () => {
  let texto = document.getElementById("search").value.toLowerCase();
  let minimo = document.getElementById("precioMin").value;
  let maximo = document.getElementById("precioMax").value;
  let marca = document.getElementById("marca").value;

  let categorias = Array.from(
    document.querySelectorAll('input[name="categoria"]:checked'),
  ).map((input) => input.value);

  let filtrados = productos.filter((producto) => {
    let coincideNombre = producto.nombre.toLowerCase().includes(texto);

    let coincideMinimo = minimo === "" || producto.precio >= Number(minimo);

    let coincideMaximo = maximo === "" || producto.precio <= Number(maximo);

    let coincideMarca = marca === "" || producto.marca === marca;

    let coincideCategoria =
      categorias.length === 0 || categorias.includes(producto.categoria);

    return (
      coincideNombre &&
      coincideMinimo &&
      coincideMaximo &&
      coincideMarca &&
      coincideCategoria
    );
  });

  renderizarProductos(filtrados);
};

/**
 * Ordena los productos por precio o nombre.
 * @param {Array} lista - Lista de productos a ordenar.
 * @returns {Array} Lista de productos ordenados.
 */
const ordenarProductos = (lista) => {
  let orden = document.getElementById("ordenProductos").value;
  let ordenados = [...lista];

  if (orden === "precio-asc") {
    ordenados.sort((a, b) => a.precio - b.precio);
  } else if (orden === "precio-desc") {
    ordenados.sort((a, b) => b.precio - a.precio);
  } else if (orden === "nombre-asc") {
    ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  } else if (orden === "nombre-desc") {
    ordenados.sort((a, b) => b.nombre.localeCompare(a.nombre, "es"));
  }

  return ordenados;
};

/**
 * Agrega un producto al carrito y lo guarda en localStorage.
 * @param {number} indice - Posición del producto en el array.
 * @returns {void}
 */
const agregarAlCarrito = (indice) => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(productos[indice]);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();

  alert("Producto agregado al carrito");
};

/**
 * Muestra los productos guardados en el carrito.
 * @returns {void}
 */
/**
 * Muestra los productos del carrito agrupados por nombre.
 * Calcula las cantidades, los subtotales y el total a pagar.
 * @returns {void} Actualiza el contenido del carrito.
 */
const mostrarCarrito = () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let listado = "";
  let total = 0;
  let agrupados = [];

  // Agrupar los productos repetidos
  carrito.forEach((producto, indice) => {
    let existente = agrupados.find(
      (item) => item.producto.nombre === producto.nombre,
    );

    if (existente) {
      existente.cantidad++;
    } else {
      agrupados.push({
        producto: producto,
        cantidad: 1,
        indiceOriginal: indice,
      });
    }
  });

  // Mostrar los productos y sus cantidades
  if (agrupados.length === 0) {
    listado = "<p>Tu carrito está vacío.</p>";
  } else {
    agrupados.forEach((item) => {
      let producto = item.producto;
      let cantidad = item.cantidad;
      let subtotal = producto.precio * cantidad;

      listado += `
                <div>
                    <img
                        src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
                        alt="${producto.nombre}"
                    >

                    <h3>${producto.nombre}</h3>
                    <p>Precio: ${formatearPrecio(producto.precio)}</p>
                    <p>Cantidad: ${cantidad}</p>
                    <p>Subtotal: ${formatearPrecio(subtotal)}</p>

                    <button type="button"
                        onclick="eliminarDelCarrito(${item.indiceOriginal})">
                        Eliminar una unidad
                    </button>
                </div>
            `;

      total += subtotal;
    });
  }

  document.getElementById("listadoCarrito").innerHTML = listado;

  document.getElementById("totalCarrito").innerText =
    "Total: " + formatearPrecio(total);
};

/**
 * Elimina un producto del carrito según su posición.
 * Actualiza localStorage y vuelve a mostrar el carrito.
 *
 * @param {number} indice - Posición del producto a eliminar.
 * @returns {void} Actualiza el carrito.
 */
const eliminarDelCarrito = (indice) => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.splice(indice, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();

  mostrarCarrito();
};

/**
 * Elimina todos los productos del carrito.
 * @returns {void}
 */
const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  actualizarContadorCarrito();
  mostrarCarrito();
};

/**
 * Actualiza el contador de productos del carrito.
 * @returns {void}
 */
const actualizarContadorCarrito = () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let contador = document.getElementById("contadorCarrito");

  if (contador) {
    contador.textContent = carrito.length;
  }
};

// Actualiza el contador al cargar la página.
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
