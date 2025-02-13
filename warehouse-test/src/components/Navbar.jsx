import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Iconos para menú móvil

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú móvil
  const location = useLocation();
  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
        setLastScrollY(currentScrollY);
      }
    };
    const [imagenPerfil, setImagenPerfil] = useState("src/assets/avatar.png"); // Imagen por defecto

    useEffect(() => {
      if (usuario?.imagenPerfil) {
        setImagenPerfil(usuario.imagenPerfil.startsWith("http") 
          ? usuario.imagenPerfil 
          : `data:image/png;base64,${usuario.imagenPerfil}`);
      }
    }, [usuario]); // Se actualiza cuando cambia el usuario
    
    return (
      <nav
        className={`fixed top-0 left-0 w-full bg-black text-white px-8 py-4 flex justify-between items-center transition-transform duration-300 z-50 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white py-6 flex flex-col items-center space-y-4 shadow-lg md:hidden">
          {!usuario ? (
            <>
              <button
                onClick={() => handleScrollToSection("testimonial-slider")}
                className="hover:text-teal-400 transition"
              >
                Nosotros
              </button>
              <button
                onClick={() => handleScrollToSection("services")}
                className="hover:text-teal-400 transition"
              >
                Servicios
              </button>
              <button
                onClick={() => handleScrollToSection("work-process")}
                className="hover:text-teal-400 transition"
              >
                Proceso
              </button>
              <a
                href="mailto:info@threelogics.com"
                className="text-teal-400 hover:text-teal-300 transition"
              >
                Contacto
              </a>
            </>
          ) : (
            <>
              <Link to="/productos" className="hover:text-teal-400 transition">
                Productos
              </Link>
              <Link
                to="/movimientos"
                className="hover:text-teal-400 transition"
              >
                Movimientos
              </Link>
              <Link to="/categorias" className="hover:text-teal-400 transition">
                Categorías
              </Link>
              <Link to="/pedidos" className="hover:text-teal-400 transition">
                Pedidos
              </Link>
              <Link to="/dashboard" className="hover:text-teal-400 transition">
                Dashboard
              </Link>
            </>
          )}
        </div>
    
  {/* Botones de autenticación con imagen de usuario */}
  <div className="hidden md:flex space-x-4 items-center relative">
        {usuario ? (
          <>
            {/* Imagen de usuario + Nombre */}
            <button 
              onClick={() => setIsModalOpen(!isModalOpen)} 
              className="text-sm flex items-center space-x-2 hover:text-teal-400 transition cursor-pointer"
            >
              <img src={imagenPerfil} alt="Perfil" className="w-8 h-8 rounded-full border-2 border-teal-500" />

              <span>{usuario?.nombre || "Usuario"}</span>
            </button>

          {/* Botones de autenticación en móvil con modal */}
          {usuario && (
            <>
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="text-sm flex items-center space-x-2 hover:text-teal-400 transition"
              >
                <img
                  src={imagenPerfil}
                  alt="Perfil"
                  className="w-8 h-8 rounded-full border-2 border-teal-500"
                />
                <span>{usuario?.nombre || "Usuario"}</span>
              </button>

              {/* Modal en móvil */}
              {isModalOpen && (
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-64 transition-opacity mt-2">
                  <div className="mt-3 flex flex-col space-y-2">
                    <Link
                      to="/perfil"
                      className="w-full text-center bg-teal-500 text-black py-2 rounded-lg hover:bg-teal-400 transition"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Editar Perfil
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
