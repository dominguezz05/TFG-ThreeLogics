import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center bg-black px-10">
      {/* Contenedor del contenido (Texto y botones) */}
      <div className="w-1/2 text-left ml-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-dm text-6xl drop-shadow-lg text-left bg-gradient-to-r from-white via-gray-200 to-black bg-clip-text text-transparent inline-block tracking-tight leading-tight"
        >
          Optimiza tu
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl font-bold text-teal-400 mt-2 drop-shadow-lg"
        >
          Gestión de almacenes
        </motion.h2>
        <p className="mt-4 text-gray-300 text-lg font-fira">
          ThreeLogics mejora la eficiencia y control en la logística
          empresarial.
        </p>
        <div className="mt-6 flex gap-6">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(45, 212, 191, 0.8)",
            }}
            className="px-6 py-3 bg-teal-500 text-black rounded-lg font-medium transition-all"
          >
            Solicitar Demo
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(45, 212, 191, 0.8)",
            }}
            className="px-6 py-3 border border-teal-500 text-white rounded-lg font-medium transition-all hover:bg-teal-500"
          >
            Más Información
          </motion.button>
        </div>
      </div>

      {/* Contenedor de la imagen alineada completamente al borde derecho */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-0 top-0 h-full w-[45vw] flex justify-end"
      >
        {/* Degradado lateral */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/85 to-black"></div>

        {/* Degradado superior */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-transparent to-transparent"></div>

        {/* Degradado inferior */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <img
          src="./map3.webp"
          alt="Almacén"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
