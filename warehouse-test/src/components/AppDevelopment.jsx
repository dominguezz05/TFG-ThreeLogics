import { motion } from "framer-motion";

export default function AppDevelopment() {
  return (
    <section className="relative py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-12">
        {/* Columna de Texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-left"
        >
          <h3 className="text-5xl font-semibold">
            <span className="text-gray-500">Application</span> Development
          </h3>
          <p className="text-gray-400 mt-4 text-lg">
            Nos apasiona crear **aplicaciones nativas de alta calidad** para iOS
            y Android, combinando **arquitectura robusta** con interfaces
            intuitivas y fluidas. Nuestro equipo se especializa en desarrollar
            **productos que destacan** en el mercado digital.
          </p>

          {/* Tecnologías utilizadas */}
          <div className="flex space-x-6 mt-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg"
              alt="Swift"
              className="w-8 h-8 transition duration-300 hover:scale-110 hover:text-teal-400"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="React Native"
              className="w-8 h-8 transition duration-300 hover:scale-110 hover:text-teal-400"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Flutter-logo.svg"
              alt="Flutter"
              className="w-8 h-8 transition duration-300 hover:scale-110 hover:text-teal-400"
            />
          </div>
        </motion.div>

        {/* Columna de Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <img
            src="/images/appdev-mockup.png" // Cambia por la imagen real
            alt="Interfaz de aplicación móvil"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
