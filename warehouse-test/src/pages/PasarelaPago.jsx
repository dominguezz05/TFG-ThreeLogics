import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

function PasarelaPago() {
  const { id } = useParams(); // Obtener el ID del pedido desde la URL
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);

  // 🏦 Simular pago después de unos segundos
  const procesarPago = async () => {
    setProcesando(true);
    toast.info("💳 Procesando pago...");

    setTimeout(async () => {
      try {
        await api.put(`/pedidos/${id}/estado`, { estado: "enviado" });
        toast.success("✅ Pago realizado con éxito. Pedido enviado.");
        navigate("/pedidos"); // Redirigir a la lista de pedidos
      } catch (error) {
        console.error("❌ Error al procesar el pago:", error);
        toast.error("❌ Error al procesar el pago.");
        setProcesando(false);
      }
    }, 3000); // Simulación de 3 segundos
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">💳 Pasarela de Pago</h1>
      <p className="mb-4">Estás a punto de pagar el pedido #{id}. Presiona el botón para completar el pago.</p>

      <button
        onClick={procesarPago}
        className={`px-4 py-2 rounded text-white ${procesando ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"}`}
        disabled={procesando}
      >
        {procesando ? "Procesando..." : "💳 Confirmar Pago"}
      </button>
    </div>
  );
}

export default PasarelaPago;
