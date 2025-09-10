import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from './context';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "user" && password === "pass") {
      setUser({ name: "Demo User" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}