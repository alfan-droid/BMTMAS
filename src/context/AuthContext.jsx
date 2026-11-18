import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

const LOCAL_ADMIN_KEY = 'bmt_mas_admin_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Jika Supabase aktif, gunakan penuh Supabase Auth (tanpa fallback demo lokal)
    if (supabase) {
      localStorage.removeItem(LOCAL_ADMIN_KEY);

      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription?.unsubscribe();
    } else {
      checkLocalSession();
    }
  }, []);

  const checkLocalSession = () => {
    try {
      const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    // Jika Supabase terkoneksi, wajib autentikasi via Supabase Auth
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error || !data?.session?.user) {
        throw new Error('Email atau password salah. Silakan coba kembali.');
      }
      localStorage.removeItem(LOCAL_ADMIN_KEY);
      setUser(data.session.user);
      return { success: true, user: data.session.user };
    }

    // Mode Demo Lokal (hanya aktif selama Supabase belum dihubungkan)
    if (
      (email.trim().toLowerCase() === 'admin@bmtmas.id' || email.trim().toLowerCase() === 'admin') &&
      password === 'admin123'
    ) {
      const demoUser = {
        id: 'admin-local-1',
        email: 'admin@bmtmas.id',
        user_metadata: { name: 'Administrator BMT MAS', role: 'Super Admin' },
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      return { success: true, user: demoUser };
    }

    throw new Error('Email atau password salah. Silakan coba kembali.');
  };

  const logout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
