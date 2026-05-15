import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("bnj_token");
    if (!token) { setLoading(false); return; }
    authApi.me().then((u) => setUser(u)).catch(() => {
      localStorage.removeItem("bnj_token");
    }).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    localStorage.setItem("bnj_token", res.token);
    setUser(res.user);
    return res.user;
  };
  const signup = async (full_name, email, password) => {
    const res = await authApi.signup({ full_name, email, password });
    localStorage.setItem("bnj_token", res.token);
    setUser(res.user);
    return res.user;
  };
  const logout = () => {
    localStorage.removeItem("bnj_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
