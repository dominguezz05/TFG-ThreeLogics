import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Íconos de menú y cerrar

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para controlar el menú móvil
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Cerrar menú después de hacer clic
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-black text-white px-6 md:px-8 py-4 flex justify-between items-center transition-transform duration-300 z-50 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo con imagen - Lleva a Hero */}
      <button
        onClick={() => handleScrollToSection("hero")}
        className="flex items-center space-x-3 bg-transparent border-none cursor-pointer"
      >
        <img src="/LogoBlancoSobreNegro.png" alt="ThreeLogics Logo" className="h-10 w-auto" />
        <span className="text-2xl font-bold text-teal-400">ThreeLogics</span>
      </button>

      {/* Menú hamburguesa para móviles */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Opciones del Menú - Versión Escritorio */}
      <div className="hidden md:flex items-center space-x-6 text-gray-300">
        <button
          onClick={() => handleScrollToSection("testimonial-slider")}
          className="hover:text-teal-400 transition bg-transparent border-none cursor-pointer"
        >
          Nosotros
        </button>
        <button
          onClick={() => handleScrollToSection("services")}
          className="hover:text-teal-400 transition bg-transparent border-none cursor-pointer"
        >
          Servicios
        </button>
        <button
          onClick={() => handleScrollToSection("work-process")}
          className="hover:text-teal-400 transition bg-transparent border-none cursor-pointer"
        >
          Proceso
        </button>
        <span className="text-gray-500 hidden md:inline">|</span>
        <a
          href="mailto:info@threelogics.com"
          className="text-teal-400 hover:text-teal-300 transition"
        >
          info@threelogics.com
        </a>
      </div>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 flex flex-col items-center justify-center space-y-6 text-xl text-white md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-300"
          >
            <X size={32} />
          </button>
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
          {!usuario ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2 bg-teal-500 rounded-lg text-black hover:bg-teal-400 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 border border-teal-500 rounded-lg text-teal-500 hover:bg-teal-500 hover:text-black transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Registrarse
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded transition"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      )}

      {/* Botones de autenticación - Versión Escritorio */}
      <div className="hidden md:flex space-x-4 items-center">
        {usuario ? (
          <>
            <span className="text-sm">👤 {usuario?.nombre || "Usuario"}</span>
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
