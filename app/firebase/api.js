import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";

export const saveUsers = (collectionName, newUser) =>
  addDoc(collection(db, collectionName), newUser);

export const updateInfo = (id, collectionName, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = (collectionName, callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getAllDocsWhereUserId = async (userId) => {
  const userDocRef = doc(db, "users", userId);

  try {
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const gamesArray = userData.games || [];

      if (gamesArray.length > 0) {
        // Crea un array de promesas para obtener los juegos por sus IDs
        const gamesPromises = gamesArray.map(async (gameId) => {
          const gameDocRef = doc(db, "games", gameId);
          const gameDocSnapshot = await getDoc(gameDocRef);

          if (gameDocSnapshot.exists()) {
            const gameData = gameDocSnapshot.data();
            return { id: gameDocSnapshot.id, ...gameData };
          }

          return null; // Si el juego no existe
        });
        const gamesData = await Promise.all(gamesPromises);

        return gamesData;
      } else {
        console.log("El usuario no tiene juegos asociados.");
        return [];
      }
    } else {
      console.log("El usuario no existe.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los juegos del usuario:", error);
    return [];
  }
};

export const getDocWhereGameId = async (collectionName, id) => {
  try {
    const docSnapshot = await getDoc(doc(db, collectionName, id));
    if (docSnapshot.exists()) {
      return {
        success: true,
        data: docSnapshot.data(),
      };
    } else {
      return {
        success: false,
        message: "No se encontró ningún juego con el ID proporcionado.",
      };
    }
  } catch (error) {
    console.error("Error al obtener el juego:", error);
    return {
      success: false,
      message: "Error al obtener el juego",
      error: error.message,
    };
  }
};

// Función para buscar un juego por su gameId
const findGameByGameId = async (gameId) => {
  const gamesCollection = collection(db, "games");
  const q = query(gamesCollection, where("gameId", "==", gameId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Devuelve el primer documento correspondiente encontrado
    return querySnapshot.docs[0];
  } else {
    // Si no se encontró un juego con ese gameId, puedes manejarlo como desees
    return null; // O lanzar una excepción, por ejemplo
  }
};

export const addParticipantToGame = async (gameId, userId) => {
  try {
    const gameIdToSearch = gameId;
    const gameDocument = await findGameByGameId(gameIdToSearch);

    if (gameDocument.exists()) {
      const gameDocRef = doc(db, "games", gameDocument.id);
      // Obtenemos la lista actual de participantes
      const currentParticipants = gameDocument.data().players || [];
      // Verificamos si el usuario ya está en la lista
      if (!currentParticipants.includes(userId)) {
        // Si no está, lo agregamos
        currentParticipants.push(userId);
        console.log(gameDocument.id);
        // Actualizamos el documento del juego con la nueva lista de participantes
        await updateDoc(gameDocRef, { players: currentParticipants });
        await updateUserGames(gameDocument.id, userId);
        return {
          success: true,
          message: `Usuario ${userId} agregado al juego ${gameId}`,
        };
      } else {
        //throw new Error(`El usuario ${userId} ya está jugando en este juego`);
        return {
          success: false,
          message: `El usuario ${userId} ya está jugando en este juego`,
        };
      }
    } else {
      console.log(`El juego con ID ${gameId} no existe`);
      return {
        success: false,
        message: `El juego con ID ${gameId} no existe`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `El usuario ${userId} ya está jugando en este juego`,
      error: error.message,
    };
  }
};

export const updateGameById = async (collectionName, gameId, updatedFields) => {
  try {
    const gameRef = doc(db, collectionName, gameId);
    await updateDoc(gameRef, updatedFields);
    return {
      success: true,
      message: "Juego actualizado exitosamente.",
    };
  } catch (error) {
    console.error("Error al actualizar el juego:", error);
    return {
      success: false,
      message: "Error al actualizar el juego",
      error: error.message,
    };
  }
};

export const deleteGameWithUserUpdates = async (userId, gameId) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    // Verifica si el juego está en la lista de juegos del usuario y, si es así, elimínalo.
    const userData = userDoc.data();
    if (userData.games && userData.games.includes(gameId)) {
      const updatedGames = userData.games.filter((id) => id !== gameId);

      // Actualiza el documento del usuario para reflejar la eliminación del juego.
      await updateDoc(userRef, {
        games: updatedGames,
      });

      // Ahora puedes eliminar el juego de la colección de juegos.
      const gameRef = doc(db, "games", gameId);
      await deleteDoc(gameRef);

      return {
        success: true,
        message: "Juego eliminado y usuario actualizado correctamente.",
      };
    } else {
      return {
        success: false,
        message: "El juego no está en la lista de juegos del usuario.",
      };
    }
  } else {
    return {
      success: false,
      message: "No se encontró al usuario con el ID proporcionado.",
    };
  }
};

export const getUser = (id, collectionName) =>
  getDoc(doc(db, collectionName, id));

export const saveGameData = async (collectionName, documentId, data, user) => {
  const collectionRef = collection(db, collectionName);

  try {
    if (collectionName && data && user) {
      // Verificar si el documento existe antes de realizar operaciones de actualización
      const docRef = documentId ? doc(collectionRef, documentId) : null;
      const docSnap = docRef ? await getDoc(docRef) : null;

      if (docSnap && docSnap.exists()) {
        // Actualizar el documento existente
        const updatedData = {
          ...data,
          updatedAt: serverTimestamp(),
          updatedBy: user,
        };
        await updateDoc(docRef, updatedData);
        return {
          success: true,
          message: `Documento ${docRef.id} actualizado con éxito.`,
        };
      } else {
        // Crear un nuevo documento si no existe
        const newData = {
          ...data,
          createdAt: serverTimestamp(),
          createdBy: user,
        };
        const newDocRef = await addDoc(collectionRef, newData);
        return {
          success: true,
          message: `Nuevo documento creado con ID ${newDocRef.id}.`,
          gameId: newDocRef.id,
        };
      }
    } else {
      return {
        success: false,
        error: `no podemos crear un registro sin los datos necesarios`,
      };
    }
  } catch (error) {
    // Manejo de errores
    return {
      success: false,
      error: `Error al guardar datos: ${error.message}`,
    };
  }
};

export const updateUserGames = async (gameId, userId) => {
  const userDocRef = doc(db, "users", userId);

  try {
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const gamesArray = userData.games || [];

      if (!gamesArray.includes(gameId)) {
        // Agrega el nuevo ID de juego al array `games` si no está presente
        await updateDoc(userDocRef, {
          games: arrayUnion(gameId),
        });
        return {
          success: true,
          message: "Juego agregado exitosamente al usuario.",
        };
      } else {
        return {
          success: false,
          message: "El juego ya está asociado al usuario.",
        };
      }
    } else {
      return {
        success: false,
        message: "El usuario no existe.",
      };
    }
  } catch (error) {
    console.error("Error al actualizar el juego del usuario:", error);
    return {
      success: false,
      message: "Error al actualizar el juego del usuario:",
      error,
    };
  }
};
