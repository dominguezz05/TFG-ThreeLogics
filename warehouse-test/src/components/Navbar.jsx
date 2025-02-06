export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      {/* Logo */}
      <div className="text-2xl font-bold text-teal-400">ThreeLogics</div>

      {/* Menú de navegación */}
      <ul className="hidden md:flex gap-6">
        <li>
          <a href="#about" className="hover:text-teal-400 transition">
            Sobre Nosotros
          </a>
        </li>
        <li>
          <a href="#services" className="hover:text-teal-400 transition">
            Servicios
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-teal-400 transition">
            Contacto
          </a>
        </li>
      </ul>

      {/* Botones */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-teal-500 rounded-lg text-black hover:bg-teal-400 transition">
          Inicio Sesión
        </button>
        <button className="px-4 py-2 border border-teal-500 rounded-lg text-teal-500 hover:bg-teal-500 hover:text-black transition">
          Registro
        </button>
      </div>
    </nav>
  );
}
