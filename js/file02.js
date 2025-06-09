"use strict";

/**
 * Objeto que contiene los arrays de rutas de imágenes para cada categoría de accesorios.
 * @type {Object.<string, string[]>}
 */
const imagenes = {
    collares: [
        "resources/collares/collares1.png",
        "resources/collares/collares2.png",
        "resources/collares/collares3.png",
        "resources/collares/collares4.png",
        "resources/collares/collares5.png",
        "resources/collares/collares6.png",
        "resources/collares/collares7.png"
    ],
    pulseras: [
        "resources/pulseras/pulseras1.png",
        "resources/pulseras/pulseras2.png",
        "resources/pulseras/pulseras3.png"
    ],
    anillos: [
        "resources/anillos/anillos1.png",
        "resources/anillos/anillos2.png"
    ],
    relicarios: [
        "resources/relicarios/relicarios1.png",
        "resources/relicarios/relicarios2.png",
        "resources/relicarios/relicarios3.png",
        "resources/relicarios/relicarios4.png",
        "resources/relicarios/relicarios5.png" 
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
    imagenes[categoria].forEach(src => {
        const div = document.createElement('div');
        div.className = "bg-gray-100 rounded-lg overflow-hidden";
        div.innerHTML = `
            <img src="${src}" alt="${categoria}" class="w-full h-64 object-cover transition-opacity hover:opacity-75">
        `;
        contenedor.appendChild(div);
    });
}

/**
 * Inicializa la renderización de imágenes para cada categoría al cargar el DOM.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", function() {
    renderImagenes('collares', 'collares');
    renderImagenes('pulseras', 'pulseras');
    renderImagenes('anillos', 'anillos');
    renderImagenes('relicarios', 'relicarios');
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

/**
 * Muestra u oculta el menú móvil al hacer clic en el ícono de hamburguesa.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");
    if (btn && menu) {
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    }
});