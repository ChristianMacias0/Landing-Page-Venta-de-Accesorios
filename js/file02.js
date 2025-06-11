"use strict";

/**
 * Objeto que contiene los arrays de rutas de imágenes para cada categoría de accesorios.
 * @type {Object.<string, string[]>}
 */
const imagenes = {
    collares: [
        { src: "resources/collares/collares1.png", precio: "Valor: $xx" },
        { src: "resources/collares/collares2.png", precio: "Valor: $xx" },
        { src: "resources/collares/collares3.png", precio: "Valor: $xx" },
        { src: "resources/collares/collares4.png", precio: "Valor: $xx" },
        { src: "resources/collares/collares5.png", precio: "Valor: $xx" },
        { src: "resources/collares/collares6.png", precio: "Valor: $xx" },
        { src: "resources/collares/collares7.png", precio: "Valor: $xx" }
    ],
    pulseras: [
        { src: "resources/pulseras/pulseras1.png", precio: "Valor: $xx" },
        { src: "resources/pulseras/pulseras2.png", precio: "Valor: $xx" },
        { src: "resources/pulseras/pulseras3.png", precio: "Valor: $xx" }
    ],
    anillos: [
        { src: "resources/anillos/anillos1.png", precio: "Valor: $xx" },
        { src: "resources/anillos/anillos2.png", precio: "Valor: $xx" }
    ],
    relicarios: [
        { src: "resources/relicarios/relicarios1.png", precio: "Valor: $xx" },
        { src: "resources/relicarios/relicarios2.png", precio: "Valor: $xx" },
        { src: "resources/relicarios/relicarios3.png", precio: "Valor: $xx" },
        { src: "resources/relicarios/relicarios4.png", precio: "Valor: $xx" },
        { src: "resources/relicarios/relicarios5.png", precio: "Valor: $xx" }
    ]
};

/**
 * Renderiza las imágenes de una categoría específica en el contenedor indicado.
 * @param {string} categoria - Nombre de la categoría (collares, pulseras, anillos, relicarios).
 * @param {string} contenedorId - ID del elemento HTML donde se insertarán las imágenes.
 * @returns {void}
 */
function renderImagenes(categoria, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    imagenes[categoria].forEach(({ src, precio }) => {
        const div = document.createElement('div');
        div.className = "bg-gray-100 rounded-lg overflow-hidden flex flex-col items-center";
        div.innerHTML = `
            <img src="${src}" alt="${categoria}" class="w-full h-64 object-cover transition-opacity hover:opacity-75 cursor-pointer modal-trigger">
            <span class="block mt-2 mb-2 text-pink-600 font-semibold">${precio}</span>
        `;
        // Evento para expandir imagen
        div.querySelector('.modal-trigger').addEventListener('click', () => {
            openModal(src, precio);
        });
        contenedor.appendChild(div);
    });
}


// Modal
function openModal(src, precio) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalPrice = document.getElementById('modal-price');
    modalImg.src = src;
    modalPrice.textContent = precio;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('image-modal').classList.add('hidden');
}


document.addEventListener("DOMContentLoaded", function() {
    renderImagenes('collares', 'collares');
    renderImagenes('pulseras', 'pulseras');
    renderImagenes('anillos', 'anillos');
    renderImagenes('relicarios', 'relicarios');

    // Cerrar modal al hacer click fuera de la imagen o en el botón de cerrar
    document.getElementById('image-modal').addEventListener('click', function(e) {
        if (e.target === this || e.target.id === 'close-modal') {
            closeModal();
        }
    });
});

/**
 * Agrega scroll suave a los enlaces internos del menú.
 * @returns {void}
 */
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