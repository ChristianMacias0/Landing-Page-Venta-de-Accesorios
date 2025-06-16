"use strict";

import { saveVote, getVotes } from "./firebase.js";
import { incrementProductView } from "./firebase.js"; 

/**
 * Muestra la notificación interactiva si existe el elemento con el ID 'toast-interactive'.
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
 * Muestra los votos almacenados en Firebase en una tabla.
 */
const displayVotes = async () => {
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) return;

    const response = await getVotes();
    if (!response.success) {
        resultsDiv.innerHTML = `<p class="text-gray-500 text-center mt-16">${response.message}</p>`;
        return;
    }

    // Contar votos por producto
    const votes = response.data;
    const voteCounts = {};
    Object.values(votes).forEach(vote => {
        if (vote.productID) {
            voteCounts[vote.productID] = (voteCounts[vote.productID] || 0) + 1;
        }
    });

    // Crear tabla
    let tableHTML = `
        <table class="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total de votos</th>
                </tr>
            </thead>
            <tbody>
    `;
    for (const [product, count] of Object.entries(voteCounts)) {
        tableHTML += `
            <tr>
                <td class="px-4 py-2">${product}</td>
                <td class="px-4 py-2">${count}</td>
            </tr>
        `;
    }
    tableHTML += `
            </tbody>
        </table>
    `;

    resultsDiv.innerHTML = tableHTML;
};

/**
 * Habilita el formulario de votación y guarda el voto en Firebase.
 */
const enableForm = () => {
    const form = document.getElementById('form_voting');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        console.log("Evento submit capturado");
        e.preventDefault();
        const select = document.getElementById('select_product');
        if (!select) return;
        const value = select.value;
        try {
            await saveVote(value);
            alert('¡Voto registrado con éxito!');
            form.reset();
            await displayVotes(); // Actualiza la tabla después de votar
        } catch (error) {
            alert('Error al registrar el voto. Intenta de nuevo.');
        }
    });
};

/**
 * Agrega listeners a todas las imágenes de productos para registrar los clics.
 */
const enableProductClickTracking = () => {
    // Selecciona todos los contenedores de productos
    const categorias = ['collares', 'pulseras', 'anillos', 'relicarios'];
    categorias.forEach(cat => {
        const container = document.getElementById(cat);
        if (container) {
            container.addEventListener('click', (e) => {
                const img = e.target.closest('img[data-product-id]');
                if (img) {
                    const productID = img.getAttribute('data-product-id');
                    if (productID) {
                        incrementProductView(productID);
                    }
                }
            });
        }
    });
};

(() => {
    showToast();
    showVideo();
    enableForm();
    displayVotes(); // Mostrar votos al cargar la página
    enableProductClickTracking(); // Habilitar seguimiento de clics en productos
})();