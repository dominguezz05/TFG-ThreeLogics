import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Dashboard() {
  const { usuario } = useContext(AuthContext);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/dashboard/estadisticas")
      .then((response) => {
        console.log("📊 Datos recibidos:", response.data);
        setEstadisticas(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener estadísticas:", err);
        setError("Error al cargar datos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!estadisticas)
    return <p className="text-red-500">❌ No hay datos disponibles.</p>;

  // Validación de valores numéricos
  const movimientosEntrada = Number(estadisticas?.movimientosEntrada) || 0;
  const movimientosSalida = Number(estadisticas?.movimientosSalida) || 0;

  // 📊 Datos para el gráfico de Entradas vs Salidas
  const datosMovimientos = [
    { tipo: "Entrada", cantidad: movimientosEntrada },
    { tipo: "Salida", cantidad: movimientosSalida },
  ];

  // 📊 Datos para productos más movidos
  const productosMasMovidos =
    estadisticas?.productosMasMovidos?.map((prod) => ({
      nombre: prod.Producto?.nombre || "Desconocido",
      total: prod.total,
    })) || [];

  const descargarPDF = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Obtener el token del usuario
      if (!token) {
        console.error("⚠️ No hay token disponible");
        return;
      }

      const response = await api.get("/dashboard/reporte-pdf", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Enviar el token en la cabecera
        responseType: "blob", // 🔥 Para manejar archivos correctamente
      });

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_movimientos.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("✅ PDF descargado correctamente");
    } catch (error) {
      console.error("❌ Error al descargar el PDF:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard de Estadísticas</h1>

      {/* 📌 Mostrar solo si hay estadísticas */}
      <div className="grid grid-cols-3 gap-5">
        <div className="p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold">📦 Total Productos</h2>
          <p className="text-3xl">{estadisticas?.totalProductos || 0}</p>
        </div>
        <div className="p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold">📊 Movimientos en 30 días</h2>
          <p className="text-3xl">{estadisticas?.totalMovimientos || 0}</p>
        </div>
        <div className="p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold">📦 Stock Total</h2>
          <p className="text-3xl">{estadisticas?.totalStock || 0}</p>
        </div>
      </div>

      {/* 📥 Botón para generar reporte PDF */}
      <button
        onClick={descargarPDF}
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      >
        📥 Descargar Reporte PDF
      </button>

      {/* 📊 Comparación de Entradas vs Salidas */}
      <h2 className="text-xl font-bold mt-5">🔄 Entradas vs Salidas</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datosMovimientos}>
          <XAxis dataKey="tipo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>

      {/* 📊 Productos Más Movidos */}
      <h2 className="text-xl font-bold mt-5">🔝 Productos Más Movidos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={productosMasMovidos}>
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>

      {/* 🔥 Categoría Más Popular */}
      <div className="mt-5 p-4 border rounded bg-yellow-100">
        <h2 className="text-xl font-semibold">🔥 Categoría Más Popular</h2>
        <p className="text-2xl font-bold">
          {estadisticas?.categoriaMasPopular || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
