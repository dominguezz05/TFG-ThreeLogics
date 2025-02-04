import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">📦 ThreeLogics</Link>
        </h1>

        {/* Navegación */}
        <nav>
          <ul className="flex space-x-4">
            {usuario && (
              <>
                <li>
                  <Link to="/productos" className="hover:underline">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/pedidos" className="hover:underline">
                    Pedidos
                  </Link>
                </li>
                <li>
                  <Link to="/movimientos" className="hover:underline">
                    Movimientos
                  </Link>
                </li>
                  <li>
                    <Link to="/categorias" className="hover:underline">
                      Categorías
                    </Link>
                  </li>
                
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Usuario y Cerrar Sesión */}
        <div className="flex items-center space-x-4">
          {usuario ? (
            <>
              <span className="text-sm">👤 {usuario.nombre}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-700 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
