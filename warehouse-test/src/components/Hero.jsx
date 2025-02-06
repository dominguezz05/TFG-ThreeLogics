import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img 
          src="/1.png" 
          alt="Almacén" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Contenido */}
      <div className="relative text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold text-white drop-shadow-lg"
        >
          Optimiza tu <span className="text-teal-400">gestión de almacenes</span>
        </motion.h1>
        <p className="mt-4 text-gray-300 text-lg">
          ThreeLogics mejora la eficiencia y control en la logística empresarial.
        </p>
        <div className="mt-6 flex justify-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(45, 212, 191, 0.8)" }}
            className="px-6 py-3 bg-teal-500 text-black rounded-lg font-medium transition-all"
          >
            Solicitar Demo
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(45, 212, 191, 0.8)" }}
            className="px-6 py-3 border border-teal-500 text-white rounded-lg font-medium transition-all hover:bg-teal-500"
          >
            Más Información
          </motion.button>
        </div>
      </div>
    </section>
  );
}
