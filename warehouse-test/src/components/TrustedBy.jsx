import githubLogo from "../assets/github1.png";
import trelloLogo from "../assets/logotrello.png";
import notionLogo from "../assets/notion1.png";
import visualLogo from "../assets/vsc.png";
import davanteLogo from "../assets/davante.png";

export default function TrustedBy() {
  return (
    <section className="py-10 bg-black text-gray-400">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm uppercase tracking-wide mb-6 text-gray-300">
          Trusted by teams at
        </p>

        {/** Contenedor de logos con separación y alineación */}
        <div className="flex items-center justify-center gap-10 md:gap-14 lg:gap-16">
          {/** GitHub */}
          <div className="flex flex-col items-center group">
            <img
              src={githubLogo}
              alt="GitHub"
              className="h-12 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm group-hover:text-white transition duration-300">
              GitHub
            </p>
          </div>

          {/** Separador */}
          <span className="h-8 w-px bg-gray-600"></span>

          {/** Trello */}
          <div className="flex flex-col items-center group">
            <img
              src={trelloLogo}
              alt="Trello"
              className="h-12 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm group-hover:text-white transition duration-300">
              Trello
            </p>
          </div>

          {/** Separador */}
          <span className="h-8 w-px bg-gray-600"></span>

          {/** Notion */}
          <div className="flex flex-col items-center group">
            <img
              src={notionLogo}
              alt="Notion"
              className="h-12 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm group-hover:text-white transition duration-300">
              Notion
            </p>
          </div>

          {/** Separador */}
          <span className="h-8 w-px bg-gray-600"></span>

          {/** Visual Studio Code */}
          <div className="flex flex-col items-center group">
            <img
              src={visualLogo}
              alt="VS Code"
              className="h-12 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm group-hover:text-white transition duration-300">
              VS Code
            </p>
          </div>

          {/** Separador */}
          <span className="h-8 w-px bg-gray-600"></span>

          {/** Davante - Ahora con hover mejorado */}
          <div className="flex flex-col items-center group">
            <img
              src={davanteLogo}
              alt="Davante"
              className="h-12 grayscale opacity-80 group-hover:opacity-100 transition duration-300"
            />
            <p className="mt-2 text-sm group-hover:text-white transition duration-300">
              Davante
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
