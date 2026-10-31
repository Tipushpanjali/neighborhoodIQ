
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore the existing login session
    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error.message);
      }

      setSession(data?.session ?? null);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for login, logout and session changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Register using email and password
  const signUp = async (fullName, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        },
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw error;

    return data;
  };

  // Login using email and password
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    return data;
  };

  // Login using Google
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) throw error;

    return data;
  };

  // Logout
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
