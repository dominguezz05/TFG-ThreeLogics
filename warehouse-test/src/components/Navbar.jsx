import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
      // Si el usuario no está en Home, lo redirigimos y después hacemos scroll
      window.location.href = `/#${sectionId}`;
    } else {
      // Si el usuario ya está en Home, solo hacemos scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-black text-white px-8 py-4 flex justify-between items-center transition-transform duration-300 z-50 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo con imagen - Ahora lleva a Hero */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleScrollToSection("hero")}
          className="flex items-center space-x-3 bg-transparent border-none cursor-pointer"
        >
          <img src="/LogoBlancoSobreNegro.png" alt="ThreeLogics Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-teal-400">ThreeLogics</span>
        </button>
      </div>

      {/* Opciones cuando NO hay usuario autenticado */}
      {!usuario ? (
        <div className="hidden md:flex items-center space-x-6 text-gray-300">
          {/* Ahora "Nosotros" lleva a TestimonialSlider */}
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
          <span className="text-gray-500">|</span>
          <a
            href="mailto:info@threelogics.com"
            className="text-teal-400 hover:text-teal-300 transition"
          >
            info@threelogics.com
          </a>
        </div>
      ) : (
        // Opciones cuando el usuario está autenticado
        <div className="hidden md:flex items-center space-x-6 text-gray-300">
          <Link to="/productos" className="hover:text-teal-400 transition">
            Productos
          </Link>
          <Link to="/movimientos" className="hover:text-teal-400 transition">
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
        </div>
      )}

      {/* Botones de autenticación */}
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
