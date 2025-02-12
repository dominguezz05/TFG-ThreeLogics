import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext"; // Importamos el contexto separado

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // 🔹 Cargar usuario desde localStorage cuando se monta la app
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsuario(parsedUser);
      } catch (error) {
        console.error("Error al parsear usuario de localStorage:", error);
        localStorage.removeItem("usuario"); // Si hay error, eliminar datos corruptos
      }
    }
  }, []);

  // 🔹 Función para iniciar sesión y actualizar el estado global
  const login = (data) => {
    if (!data.usuario || !data.token) {
      console.error("Datos inválidos en login:", data);
      return;
    }

    // Guardar usuario con email y `lastPasswordChange`
    const usuarioData = {
      id: data.usuario.id,
      nombre: data.usuario.nombre,
      email: data.usuario.email, // ✅ Asegurar que el email se guarda
      rol: data.usuario.rol,
      lastPasswordChange: data.usuario.lastPasswordChange || null, // ✅ Almacenar fecha de último cambio de contraseña
    };

    // Guardar en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));

    // Actualizar estado global
    setUsuario(usuarioData);
  };

  // 🔹 Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  // 🔹 Función para actualizar perfil (incluyendo la contraseña si cambia)
  const actualizarPerfil = (datosActualizados) => {
    const usuarioActualizado = {
      ...usuario,
      ...datosActualizados,
    };

    // Si el usuario cambió la contraseña, actualizar `lastPasswordChange`
    if (datosActualizados.lastPasswordChange) {
      usuarioActualizado.lastPasswordChange = datosActualizados.lastPasswordChange;
    }

    // Guardar en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

    // Actualizar estado global
    setUsuario(usuarioActualizado);
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, login, logout, actualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}

// Validación de PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
