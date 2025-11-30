"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { getUser } from "../supabase/api";

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
    // Create user account
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    // Save additional user data to users table
    const { error: insertError } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        ...data,
        created_at: new Date().toISOString(),
      }]);

    if (insertError) throw insertError;
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  };

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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        getMyUserById(session.user.id);
        setUser(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getMyUserById(session.user.id);
        setUser(session.user);
      } else {
        setUser(null);
        setUserInfo(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
