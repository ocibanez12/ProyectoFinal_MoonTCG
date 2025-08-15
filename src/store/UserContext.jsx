import React, { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // usuario actual
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]); // lista de usuarios

  // Cargar usuarios desde localStorage al iniciar
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Inicializa con un usuario de prueba si no hay nada
      const initialUsers = [
        {
          id: 1,
          name: "Usuario de prueba",
          email: "test@test.com",
          password: "1234",
        },
      ];
      setUsers(initialUsers);
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }
  }, []);

  // Registrar un nuevo usuario
  // En UserContext.jsx
const registerUser = (newUser) => {
  setError(null);

  // Verificar si el email ya existe
  const existingUser = users.find((u) => u.email === newUser.email);
  if (existingUser) {
    setError("El correo ya está registrado.");
    return { success: false, message: "El correo ya está registrado." };
  }

  const userToAdd = {
    id: users.length + 1,
    ...newUser,
  };

  const updatedUsers = [...users, userToAdd];
  setUsers(updatedUsers);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  return { success: true };
};


  // Login
  const authLogin = async (email, password) => {
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulando delay

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      const fakeToken = "123456abcdef";
      setToken(fakeToken);
      localStorage.setItem("token", fakeToken);
      return true;
    } else {
      setError("Usuario o contraseña incorrectos");
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const globalUser = {
    user,
    setUser,
    token,
    error,
    users,
    setUsers,
    authLogin,
    logout,
    registerUser,
  };

  return (
    <UserContext.Provider value={globalUser}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
