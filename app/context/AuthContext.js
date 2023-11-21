"use client";
import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getUser } from "../firebase/api";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const signup = async (email, password, data) => {
    await createUserWithEmailAndPassword(auth, email, password);
    //await sendEmailVerification(auth.currentUser);
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      ...data,
      timeStamp: serverTimestamp(),
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    signOut(auth);
  };

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  const getMyUserById = async (id) => {
    try {
      const doc = await getUser(id, "users");
      setUserInfo({ ...doc.data() });
      console.log({ ...doc.data() });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log({ currentUser }); //TODO: removed it for PROD

      if (currentUser?.uid) {
        getMyUserById(currentUser.uid);
        setUser(currentUser);
      } else if (currentUser === null) {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        userInfo,
        getMyUserById,
        logout,
        loading,
        setLoading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
