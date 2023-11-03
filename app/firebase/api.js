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

export const getAllDocsWhereUserId = async (collectionName, id) => {
  const q = query(collection(db, collectionName), where("createdBy", "==", id));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return {
        success: false,
        message: "No se encontraron documentos",
        data: [],
      };
    }

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    documents.sort((a, b) => b.data.createdAt - a.data.createdAt);

    return {
      success: true,
      message: "Documentos encontrados exitosamente",
      data: documents,
    };
  } catch (error) {
    console.error("Error al buscar documentos:", error);
    return {
      success: false,
      message: "Error al buscar documentos",
      error: error.message,
    };
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
        console.log(`Usuario ${userId} agregado al juego ${gameId}`);
      } else {
        console.log(`El usuario ${userId} ya está en el juego ${gameId}`);
        // Puedes lanzar una excepción o devolver un mensaje de error
        throw new Error(`El usuario ${userId} ya está jugando en este juego`);
      }
    } else {
      console.log(`El juego con ID ${gameId} no existe`);
    }
  } catch (error) {
    console.error("Error al agregar participante al juego:", error);
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

export const deleteDocFromCollectionById = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id))
    .then((result) => {
      return {
        success: true,
        message: "Documento borrado exitosamente",
        data: result,
      };
    })
    .catch((error) => {
      console.error("Error al borrar el documento");
      return {
        success: false,
        message: "Error al buscar documentos",
        error: error.message,
      };
    });
};

export const getUser = (id, collectionName) =>
  getDoc(doc(db, collectionName, id));

export const saveData = async (collectionName, documentId, data, user) => {
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
