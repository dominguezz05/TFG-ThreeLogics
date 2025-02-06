import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/almacen.jpg')" }}
    >
      {/* Capa de oscurecimiento */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenido */}
      <div className="relative text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-white"
        >
          Optimiza tu{" "}
          <span className="text-teal-400">gestión de almacenes</span>
        </motion.h1>
        <p className="mt-4 text-gray-300">
          ThreeLogics mejora la eficiencia y control en la logística
          empresarial.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-3 bg-teal-500 text-black rounded-lg hover:bg-teal-400">
            Solicitar Demo
          </button>
          <button className="px-6 py-3 border border-teal-500 text-white rounded-lg hover:bg-teal-500">
            Más Información
          </button>
        </div>
      </div>
    </section>
  );
}
