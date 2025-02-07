import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import Movimientos from "./pages/Movimientos";
import CrearProducto from "./pages/CrearProducto";
import CrearCategoria from "./pages/CrearCategoria";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PasarelaPago from "./pages/PasarelaPago";
import Pedidos from "./pages/Pedidos";
import CrearPedido from "./pages/CrearPedido";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { usuario } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Routes>
        {/* ✅ Ahora la ruta raíz usa Home.jsx */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={usuario ? <Navigate to="/productos" /> : <Login />}
        />
        <Route
          path="/register"
          element={usuario ? <Navigate to="/productos" /> : <Register />}
        />
        <Route
          path="/productos"
          element={usuario ? <Productos /> : <Navigate to="/login" />}
        />
        <Route
          path="/movimientos"
          element={usuario ? <Movimientos /> : <Navigate to="/login" />}
        />
        <Route
          path="/categorias"
          element={usuario ? <Categorias /> : <Navigate to="/login" />}
        />
        <Route
          path="/crear-producto"
          element={usuario ? <CrearProducto /> : <Navigate to="/login" />}
        />
        <Route
          path="/crear-categoria"
          element={usuario ? <CrearCategoria /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={usuario ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/pedidos"
          element={usuario ? <Pedidos /> : <Navigate to="/" />}
        />
        <Route
          path="/crear-pedido"
          element={usuario ? <CrearPedido /> : <Navigate to="/" />}
        />
        <Route path="/pago/:id" element={<PasarelaPago />} />
        

        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
