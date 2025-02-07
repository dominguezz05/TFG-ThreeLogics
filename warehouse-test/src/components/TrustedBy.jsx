import githubLogo from "../assets/github1.png";
import trelloLogo from "../assets/logotrello.png";
import notionLogo from "../assets/notion1.png";
import visualLogo from "../assets/vsc.png";
import davanteLogo from "../assets/davante.png";

export default function TrustedBy() {
  return (
    <section className="py-16 bg-black text-gray-400">
      <div className="max-w-7xl mx-auto text-center px-6">
        <p className="text-lg uppercase tracking-wide mb-8 text-gray-300">
          Trusted by teams at
        </p>

        {/* Contenedor de logos con diseño responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 place-items-center">
          {/* GitHub */}
          <div className="flex flex-col items-center group">
            <img
              src={githubLogo}
              alt="GitHub"
              className="h-12 sm:h-14 md:h-16 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm sm:text-base group-hover:text-white transition duration-300">
              GitHub
            </p>
          </div>

          {/* Trello */}
          <div className="flex flex-col items-center group">
            <img
              src={trelloLogo}
              alt="Trello"
              className="h-12 sm:h-14 md:h-16 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm sm:text-base group-hover:text-white transition duration-300">
              Trello
            </p>
          </div>

          {/* Notion */}
          <div className="flex flex-col items-center group">
            <img
              src={notionLogo}
              alt="Notion"
              className="h-12 sm:h-14 md:h-16 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm sm:text-base group-hover:text-white transition duration-300">
              Notion
            </p>
          </div>

          {/* Visual Studio Code */}
          <div className="flex flex-col items-center group">
            <img
              src={visualLogo}
              alt="VS Code"
              className="h-12 sm:h-14 md:h-16 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm sm:text-base group-hover:text-white transition duration-300">
              VS Code
            </p>
          </div>

          {/* Davante */}
          <div className="flex flex-col items-center group">
            <img
              src={davanteLogo}
              alt="Davante"
              className="h-12 sm:h-14 md:h-16 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm sm:text-base group-hover:text-white transition duration-300">
              Davante
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
