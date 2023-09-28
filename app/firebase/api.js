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

export const getUsers = (collectionName) =>
  getDocs(collection(db, collectionName));

export const deleteUser = (id, collectionName) =>
  deleteDoc(doc(db, collectionName, id));

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
