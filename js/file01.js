"use strict";
import { saveVote } from "./firebase.js";
import { getVotes } from "./firebase.js";

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
 * Habilita el formulario de votación y gestiona el envío de votos.
 * @returns {void}
 */
const enableForm = () => {
    const form = document.getElementById('form_voting');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = document.getElementById('select_product');
            if (input) {
                const productID = input.value;
                await saveVote(productID);
                form.reset();
                await displayVotes();
            }
        });
    }
};

/**
 * Muestra los votos en una tabla dentro del elemento con id 'results'.
 * @returns {void}
 */
const displayVotes = async () => {
    const results = document.getElementById('results');
    if (!results) return;
    const response = await getVotes();
    if (!response.success || !response.data) {
        results.innerHTML = '<p>No hay votos registrados.</p>';
        return;
    }
    // Contar votos por producto
    const votes = response.data;
    const voteCount = {};
    Object.values(votes).forEach(vote => {
        if (vote.productID) {
            voteCount[vote.productID] = (voteCount[vote.productID] || 0) + 1;
        }
    });
    // Crear tabla
    let table = '<table class="min-w-full text-left text-sm"><thead><tr><th>Producto</th><th>Total de votos</th></tr></thead><tbody>';
    Object.entries(voteCount).forEach(([product, count]) => {
        table += `<tr><td>${product}</td><td>${count}</td></tr>`;
    });
    table += '</tbody></table>';
    results.innerHTML = table;
};

(() => {
    showToast();
    showVideo();
    enableForm();
    displayVotes();
})();