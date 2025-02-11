import { useState } from "react";
import githubLogo from "../assets/github1.png";
import trelloLogo from "../assets/logotrello.webp";
import notionLogo from "../assets/notion1.webp";
import visualLogo from "../assets/vsc.webp";
import davanteLogo from "../assets/davante.webp";

export default function TrustedBy() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const logos = [
    { src: githubLogo, alt: "GitHub", name: "GitHub" },
    { src: trelloLogo, alt: "Trello", name: "Trello" },
    { src: notionLogo, alt: "Notion", name: "Notion" },
    { src: visualLogo, alt: "VS Code", name: "VS Code" },
    { src: davanteLogo, alt: "Davante", name: "Davante" },
  ];

  return (
    <section className="py-16 bg-black text-gray-400">
      <div className="max-w-7xl mx-auto text-center px-6">
        <p className="text-lg uppercase tracking-wide mb-8 text-gray-300">
          Trusted by teams at
        </p>

        {/* Contenedor de logos con diseño responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 place-items-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`h-12 sm:h-14 md:h-16 grayscale transition-opacity duration-500 ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "opacity-30"
                    : "opacity-80 group-hover:opacity-100"
                }`}
              />
              <p
                className={`mt-2 text-sm sm:text-base transition-opacity duration-500 ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "text-gray-600"
                    : "group-hover:text-white"
                }`}
              >
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
