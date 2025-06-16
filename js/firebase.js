// Importar funciones de Firebase desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push, get, child, runTransaction } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

/**
 * Guarda un voto en la colección 'votes' de la base de datos.
 * @param {string} productID - El ID del producto votado.
 * @returns {Promise<object>} - Mensaje de éxito o error.
 */
export async function saveVote(productID) {
  try {
    const votesRef = ref(database, 'votes');
    const newVoteRef = push(votesRef);
    await set(newVoteRef, {
      productID,
      date: new Date().toISOString()
    });
    return { success: true, message: 'Voto guardado correctamente.' };
  } catch (error) {
    return { success: false, message: 'Error al guardar el voto.', error };
  }
}

/**
 * Obtiene todos los votos de la colección 'votes' de la base de datos.
 * @returns {Promise<object>} - Objeto con los votos o mensaje de error.
 */
export async function getVotes() {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'votes'));
    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    } else {
      return { success: false, message: 'No hay votos registrados.' };
    }
  } catch (error) {
    return { success: false, message: 'Error al obtener los votos.', error };
  }
}

/**
 * Incrementa la vista de un producto en la colección 'productosmasvistos'.
 * @param {string} productID - El ID del producto.
 */
export async function incrementProductView(productID) {
    const db = getDatabase();
    const productRef = ref(db, `productosmasvistos/${productID}/count`);
    await runTransaction(productRef, (currentCount) => {
        return (currentCount || 0) + 1;
    });
}

