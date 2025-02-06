import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      {/* Logo */}
      <div className="text-2xl font-bold text-teal-400">
        <Link to="/">📦 ThreeLogics</Link>
      </div>

      {/* Menú de navegación */}
      <nav>
        <ul className="hidden md:flex gap-6">
          <li>
            <Link to="/productos" className="hover:text-teal-400 transition">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/pedidos" className="hover:text-teal-400 transition">
              Pedidos
            </Link>
          </li>
          <li>
            <Link to="/movimientos" className="hover:text-teal-400 transition">
              Movimientos
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-teal-400 transition">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      {/* Botones */}
      <div className="flex space-x-4 items-center">
        {usuario ? (
          <>
            <span className="text-sm">👤 {usuario.nombre}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-3 py-1 rounded transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-teal-500 rounded-lg text-black hover:bg-teal-400 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border border-teal-500 rounded-lg text-teal-500 hover:bg-teal-500 hover:text-black transition"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
