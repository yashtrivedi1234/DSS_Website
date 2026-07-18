
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data:", err);
        localStorage.removeItem("userData"); 
      }
    }
  }, []); 


  const logout = () => {
    setUserData(null);
    localStorage.removeItem("userData"); 
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
