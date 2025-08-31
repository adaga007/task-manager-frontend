// src/context/UserProvider.jsx
import { useState, useEffect } from "react";
import { UserContext } from "./userContext";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://task-manager-backend-3mau.onrender.com/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/tasks";
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://task-manager-backend-3mau.onrender.com/api/auth/register",
        formData
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/tasks";
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading, register }}>
      {children}
    </UserContext.Provider>
  );
}
