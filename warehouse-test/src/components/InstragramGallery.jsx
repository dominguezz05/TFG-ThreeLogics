import { motion } from "framer-motion";

const InstagramGallery = () => {
  return (
    <div className="my-16 flex justify-center">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.2 }} // Reaparece con scroll
      >
        {["src/assets/1.webp", "src/assets/2.webp", "src/assets/3.webp"].map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.2 }} // Reactiva animación con scroll
            className="relative group overflow-hidden rounded-2xl bg-gray-900 shadow-2xl border border-gray-700 p-4"
          >
            <motion.img
              src={img}
              alt={`Instagram post ${index + 1}`}
              className="w-75 h-100 object-cover rounded-xl transition-transform duration-300 transform group-hover:scale-105"
              whileHover={{ scale: 1.1 }}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InstagramGallery;
