import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext"; // Importamos el contexto separado

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage cuando se monta la app
  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  // Función para iniciar sesión y actualizar el estado global
  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    setUsuario(data.usuario); // 👈 Esto actualiza el estado inmediatamente
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Validación de PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
