import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("email") || ""); // 이메일 상태 추가
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("isAdmin") === "true"; // 문자열 "true" 체크
    setIsAuthenticated(!!token);
    setIsAdmin(admin);  
  }, []);

  const login = (token, admin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", admin);
    setIsAuthenticated(true);
    setIsAdmin(admin);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setEmail("");
  };

  const saveEmail = (email) => {
    localStorage.setItem("email", email);
    setEmail(email);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, email, login, logout, saveEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
