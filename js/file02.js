import { incrementProductView, obtenerTopProductos } from "./firebase.js";



/**
 * Definición de productos por categoría según la carpeta /resources.
 * Todos los precios están en "$xx".
 */
const productos = {
  collares: [
    { nombre: "collares1", src: "/resources/collares/collares1.png", precio: "$2.00" },
    { nombre: "collares2", src: "/resources/collares/collares2.png", precio: "$2.00" },
    { nombre: "collares3", src: "/resources/collares/collares3.png", precio: "$2.50" },
    { nombre: "collares4", src: "/resources/collares/collares4.png", precio: "$2.00" },
    { nombre: "collares5", src: "/resources/collares/collares5.png", precio: "$2.50" },
    { nombre: "collares6", src: "/resources/collares/collares6.png", precio: "$2.50" },
    { nombre: "collares7", src: "/resources/collares/collares7.png", precio: "$2.00" }
  ],
  pulseras: [
    { nombre: "pulseras1", src: "/resources/pulseras/pulseras1.png", precio: "$1.00" },
    { nombre: "pulseras2", src: "/resources/pulseras/pulseras2.png", precio: "$1.50" },
    { nombre: "pulseras3", src: "/resources/pulseras/pulseras3.png", precio: "$1.00" }
  ],
  anillos: [
    { nombre: "anillos1", src: "/resources/anillos/anillos1.png", precio: "$0.50" },
    { nombre: "anillos2", src: "/resources/anillos/anillos2.png", precio: "$0.50" }
  ],
  relicarios: [
    { nombre: "relicarios1", src: "/resources/relicarios/relicarios1.png", precio: "$2.00" },
    { nombre: "relicarios2", src: "/resources/relicarios/relicarios2.png", precio: "$1.50" },
    { nombre: "relicarios3", src: "/resources/relicarios/relicarios3.png", precio: "$2.50" },
    { nombre: "relicarios4", src: "/resources/relicarios/relicarios4.png", precio: "$1.50" },
    { nombre: "relicarios5", src: "/resources/relicarios/relicarios5.png", precio: "$2.00" }
  ]
};
/**
 * Renderiza los productos en sus respectivos contenedores.
 * Al hacer clic en una imagen, abre el modal y registra la vista en la base de datos.
 */
function renderProductos() {
  Object.entries(productos).forEach(([categoria, items]) => {
    const contenedor = document.getElementById(categoria);
    if (contenedor) {
      contenedor.innerHTML = ""; // Limpia el contenedor antes de agregar productos
      items.forEach(producto => {
        // Crear contenedor para cada producto
        const div = document.createElement("div");
        div.className = "flex flex-col items-center mb-6";

        // Crear imagen del producto
        const img = document.createElement("img");
        img.src = producto.src;
        img.alt = producto.nombre;
        img.className = "rounded-lg shadow-md cursor-pointer hover:scale-105 transition w-48 h-48 object-cover";
        img.setAttribute("data-product-id", producto.nombre);

        // Evento: al hacer clic, mostrar modal y registrar vista
        img.addEventListener("click", () => {
          mostrarModalImagen(producto.src, producto.nombre, producto.precio);
          incrementProductView(producto.nombre); // Registrar la vista en la base de datos
        });

        // Mostrar el precio debajo de la imagen
        const precio = document.createElement("span");
        precio.className = "mt-2 text-pink-600 font-semibold";
        precio.textContent = producto.precio;

        div.appendChild(img);
        div.appendChild(precio);
        contenedor.appendChild(div);
      });
    }
  });
}

/**
 * Muestra el modal con la imagen expandida y el precio.
 * Permite cerrar el modal haciendo clic en el botón o fuera del contenido.
 */
function mostrarModalImagen(src, nombre, precio) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalPrice = document.getElementById("modal-price");
  if (modal && modalImg && modalPrice) {
    modalImg.src = src;
    modalImg.alt = nombre;
    modalPrice.textContent = precio;
    modal.classList.remove("hidden");
  }
}

// Cerrar el modal al hacer clic en el botón o fuera del contenido
document.addEventListener("DOMContentLoaded", function() {
  renderProductos();

  const modal = document.getElementById("image-modal");
  if (modal) {
    modal.addEventListener("click", function(e) {
      if (e.target === modal || e.target.id === "close-modal") {
        modal.classList.add("hidden");
        // Limpia la imagen y el precio del modal
        document.getElementById("modal-img").src = "";
        document.getElementById("modal-price").textContent = "";
      }
    });
  }
});

// Scroll suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1 && document.querySelector(targetId)) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.mobile-menu-button');
  const menu = document.querySelector('.mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
});

// Función para buscar un producto por nombre en todas las categorías
function buscarProductoPorNombre(nombre) {
  for (const categoria in productos) {
    const producto = productos[categoria].find(p => p.nombre === nombre);
    if (producto) return producto;
  }
  return null;
}

async function mostrarTopProductos() {
  const topProductos = await obtenerTopProductos(3);
  const lista = document.getElementById('top-products-list');
  lista.innerHTML = '';
  
  topProductos.forEach(({ id, count }, index) => {
    const producto = buscarProductoPorNombre(id);
    if (!producto) return;

    const li = document.createElement('li');
    li.className = "bg-white rounded-xl shadow-md flex flex-col items-center p-4 min-w-[200px]";

    li.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="w-24 h-24 mb-3 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <img src="${producto.src}" alt="${producto.nombre}" class="object-contain w-full h-full"/>
        </div>
        <div class="text-center">
          <h3 class="font-semibold text-lg mb-1">Top ${index + 1}</h3>
          <p class="text-gray-700 mb-1">Precio: <span class="font-bold">${producto.precio}</span></p>
          <p class="text-sm text-gray-500">Visto <span class="font-bold">${count/2}</span> veces</p>
        </div>
      </div>
    `;
    lista.appendChild(li);
  });

}

document.addEventListener('DOMContentLoaded', mostrarTopProductos);
