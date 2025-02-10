export default function Footer() {
  return (
    <footer className="bg-black text-white py-16" id="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Sección de Newsletter */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">
            Suscríbete a nuestro newsletter
          </h3>
          <p className="text-gray-400 text-lg">
            Recibe actualizaciones y noticias sobre gestión de almacenes.
          </p>
          <div className="mt-6 flex justify-center">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="px-6 py-3 w-80 text-lg rounded-l bg-gray-800 text-white outline-none"
            />
            <button className="bg-teal-500 px-6 py-3 text-lg rounded-r text-black font-bold hover:bg-teal-400 transition">
              Suscribirse
            </button>
          </div>
        </div>

        {/* Información y enlaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          {/* Contacto - Alineado a la izquierda */}
          <div className="md:text-left">
            <h4 className="text-2xl font-semibold mb-6 text-teal-400">
              Contacto
            </h4>
            <p className="text-gray-300 text-lg">📩 info@threelogics.com</p>
            <p className="text-gray-300 text-lg mt-2">📍 Fuenlabrada, España</p>
            <div className="flex justify-center md:justify-start space-x-6 mt-6 text-xl">
              <a href="#" className="text-gray-400 hover:text-teal-400">
                🔗 LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400">
                📘 Github
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400">
                📷 Instagram
              </a>
            </div>
          </div>

          {/* Soluciones - Centrado */}
          <div className="md:text-center">
            <h4 className="text-2xl font-semibold mb-6 text-teal-400">
              Soluciones
            </h4>
            <ul className="text-gray-300 text-lg space-y-4">
              <li>
                <a href="#" className="hover:text-teal-400">
                  Gestión de Inventarios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  Optimización de Almacenes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  Seguimiento de Pedidos
                </a>
              </li>
            </ul>
          </div>

          {/* Recursos - Alineado a la derecha */}
          <div className="md:text-right">
            <h4 className="text-2xl font-semibold mb-6 text-teal-400">
              Recursos
            </h4>
            <ul className="text-gray-300 text-lg space-y-4">
              <li>
                <a href="#" className="hover:text-teal-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  Casos de Éxito
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  Webinars
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Marca y derechos */}
        <div className="mt-16 text-center text-gray-500 text-lg uppercase">
          <p>© 2025 ThreeLogics - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
