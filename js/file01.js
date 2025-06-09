"use strict";
import { fetchFakerData } from "./functions.js";
/**
 * Muestra la notificación interactiva si existe el elemento con el ID 'toast-interactive'.
 * Elimina la clase 'hidden' y agrega la clase 'md:block' para hacer visible el toast.
 * @returns {void}
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.remove("hidden");
        toast.classList.add("md:block");
    }
};

/**
 * Agrega un evento click al botón con el ID 'demo' para abrir un video de YouTube en una nueva pestaña.
 * Si el botón existe, al hacer click se abrirá el enlace especificado.
 * @returns {void}
 */
const showVideo = () => {
    const demoBtn = document.getElementById("demo");
    if (demoBtn) {
        demoBtn.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

/**
 * Renderiza tarjetas usando los tres primeros objetos del arreglo recibido.
 * Cada tarjeta muestra title, author, genre y content usando TailwindCSS v4.
 * Inserta las tarjetas en el elemento con id 'skeleton-container'.
 * @param {Array} data - Arreglo de objetos con claves title, author, genre, content.
 */
const renderCards = (data) => {
    const container = document.getElementById("skeleton-container");
    if (!container) return;

    // Limpiar el contenedor antes de renderizar
    container.innerHTML = "";

    data.slice(0, 3).forEach(item => {
        const card = `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
                <h2 class="text-xl font-bold mb-2 text-gray-900">${item.title}</h2>
                <p class="text-sm text-gray-500 mb-1">Autor: <span class="font-medium">${item.author}</span></p>
                <p class="text-sm text-gray-500 mb-3">Género: <span class="font-medium">${item.genre}</span></p>
                <p class="text-gray-700">${item.content}</p>
            </div>
        `;
        container.innerHTML += card;
    });
};

const loadData = async () => {

    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';

    try {
        const result = await fetchFakerData(url);

        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
            // Llama a renderCards con los datos obtenidos
            renderCards(result.body.data);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }

    } catch (error) {

        console.error('Ocurrió un error inesperado:', error);

    }

};


(() => {
    showToast();
    showVideo();
    // Llama a loadData para cargar y mostrar los datos y renderizar tarjetas
    loadData();
})();