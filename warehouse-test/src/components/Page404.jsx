import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black to-teal-700 text-white text-center">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      <p className="text-2xl mt-4">¡Oops! La página que buscas no existe.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-teal-400 text-gray-900 text-lg font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-transform transform hover:scale-105"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default Page404;
