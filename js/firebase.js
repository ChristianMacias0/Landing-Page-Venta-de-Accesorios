// Importa las funciones necesarias desde el CDN de Firebase v11.9.1
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la referencia a la base de datos en tiempo real
const database = getDatabase(app);

// Función para guardar un voto en la base de datos
export async function saveVote(productID) {
  try {
    // Referencia a la colección 'votes'
    const votesRef = ref(database, 'votes');
    // Nueva referencia para un usuario (voto único)
    const newVoteRef = push(votesRef);
    // Datos a guardar
    const voteData = {
      productID,
      date: new Date().toISOString()
    };
    await set(newVoteRef, voteData);
    return { success: true, message: 'Voto guardado correctamente.' };
  } catch (error) {
    return { success: false, message: 'Error al guardar el voto.', error };
  }
}

// Función para obtener los votos de la base de datos
export async function getVotes() {
  try {
    const votesRef = ref(database, 'votes');
    const snapshot = await get(votesRef);
    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    } else {
      return { success: true, data: null, message: 'No hay votos registrados.' };
    }
  } catch (error) {
    return { success: false, message: 'Error al obtener los votos.', error };
  }
}