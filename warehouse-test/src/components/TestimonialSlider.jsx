import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    companyLogo: "https://via.placeholder.com/100x50", // Reemplazar con logo real
    companyName: "Github",
    quote:
      "El profesionalismo y las habilidades organizativas excepcionales hacen que la colaboración sea un placer. El equipo de Serge destaca en cada tarea, superando expectativas. Un verdadero placer trabajar con ellos.",
    author: "Adrián Vaquero",
    position: "CoFunder ThreeLogics",
    avatar: "https://via.placeholder.com/50", // Reemplazar con imagen real
  },
  {
    companyLogo: "https://via.placeholder.com/100x50",
    companyName: "TechCorp",
    quote:
      "Un equipo increíblemente dedicado y profesional. Su enfoque meticuloso y atención al detalle elevaron nuestro proyecto a otro nivel.",
    author: "Laura Martínez",
    position: "CEO de TechCorp",
    avatar: "https://via.placeholder.com/50",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const nextTestimonial = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col items-center text-center p-8 bg-black text-white rounded-lg">
      <h2 className="text-3xl font-semibold mb-2">
        Únete al <span className="text-green-400">ThreeLogics Club</span>
      </h2>
      <p className="text-gray-400 mb-6">
        Estamos construyendo una comunidad empresarial extraordinaria basada en
        valores compartidos y estándares profesionales.
      </p>

      <div className="relative w-full max-w-2xl bg-gray-900 p-6 rounded-xl">
        {/* Botón Izquierdo */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        {/* Contenido del Testimonio */}
        <div className="flex flex-col items-center">
          <img
            src={testimonials[current].companyLogo}
            alt={testimonials[current].companyName}
            className="w-20 mb-4"
          />
          <p className="text-lg italic mb-4">{testimonials[current].quote}</p>

          <div className="flex items-center gap-3">
            <img
              src={testimonials[current].avatar}
              alt={testimonials[current].author}
              className="w-10 h-10 rounded-full"
            />
            <div className="text-left">
              <p className="font-semibold">{testimonials[current].author}</p>
              <p className="text-sm text-gray-400">
                {testimonials[current].position}
              </p>
            </div>
          </div>
        </div>

        {/* Botón Derecho */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
          onClick={nextTestimonial}
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
