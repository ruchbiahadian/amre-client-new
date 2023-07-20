import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      try {
        const { data, expires } = JSON.parse(storedData);
        if (expires && expires > Date.now()) {
          return data;
        }
      } catch (error) {
        console.error("Failed to parse stored data:", error);
      }
    }
    return null;
  });

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  const logout = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("user");
    }
    setCurrentUser(null);
  };

  const updateCurrentUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const userObject = {
        data: currentUser,
        expires: Date.now() + (3600000 * 2), 
      };
      localStorage.setItem("user", JSON.stringify(userObject));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
