'use strict';

/**
 * Realiza una petición fetch a la URL proporcionada y retorna un objeto con el resultado.
 * Si la petición es exitosa, retorna un objeto con success: true y los datos en body.
 * Si ocurre un error, retorna un objeto con success: false y el mensaje de error.
 *
 * @param {string} url - URL a la que se realizará la petición fetch.
 * @returns {Promise<{success: boolean, body?: any, error?: string}>} Promesa que resuelve con el resultado de la petición.
 */
let fetchFakerData = (url) => {
    return fetch(url)
        .then(response => {
            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Respuesta exitosa
            return {
                success: true,
                body: data
            };
        })
        .catch(error => {
            return {
                success: false,
                error: `Error en la petición: ${error.message}`
            };
        });
}

export { fetchFakerData }