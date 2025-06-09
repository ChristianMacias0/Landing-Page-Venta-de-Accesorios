"use strict";

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

(() => {
    showToast();
    showVideo();
})();