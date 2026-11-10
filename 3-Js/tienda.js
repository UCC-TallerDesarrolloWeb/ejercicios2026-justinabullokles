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
 * Genera dinámicamente las tarjetas de los productos.
 * @returns {void} Muestra los productos en el HTML.
 */
const renderizarProductos = () => {
  let tarjetas = "";

  productos.forEach((producto, indice) => {
    tarjetas += `
            <div>
                <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
                     alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>Precio: $${producto.precio}</p>

                <button type="button" onclick="mostrarDetalleProducto(${indice})">
                    Ver detalle de Producto
                </button>
                <button type="button" onclick="agregarAlCarrito(${indice})">
                    Agregar al carrito
                </button>
            </div>
        `;
  });

  document.getElementById("listadoProductos").innerHTML = tarjetas;
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

  alert("Producto agregado al carrito");
};

/**
 * Muestra los productos guardados en el carrito.
 * @returns {void}
 */
const mostrarCarrito = () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let listado = "";
  let total = 0;

  if (carrito.length === 0) {
    listado = "<p>Tu carrito está vacío.</p>";
  } else {
    carrito.forEach((producto, indice) => {
      listado += `
                <div>
                    <img
                        src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}"
                        alt="${producto.nombre}"
                    >
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>

                    <button type="button" onclick="eliminarDelCarrito(${indice})">
                          Eliminar producto
                    </button>

                </div>
            `;

      total += Number(producto.precio);
    });
  }

  document.getElementById("listadoCarrito").innerHTML = listado;
  document.getElementById("totalCarrito").innerText = "Total: $" + total;
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

  mostrarCarrito();
};

/**
 * Elimina todos los productos del carrito.
 * @returns {void}
 */
const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  mostrarCarrito();
};
