import { useState } from "react";

export default function Perfil() {
  const [user, setUser] = useState({ name: "Juan Pérez", email: "juan@example.com" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-white text-2xl font-bold">Editar Perfil</h2>

      <label className="text-gray-400 block mt-4">Nombre</label>
      <input 
        type="text" 
        name="name" 
        value={user.name} 
        onChange={handleChange} 
        className="w-full p-2 mt-2 rounded bg-gray-800 text-white"
      />

      <label className="text-gray-400 block mt-4">Email</label>
      <input 
        type="email" 
        name="email" 
        value={user.email} 
        onChange={handleChange} 
        className="w-full p-2 mt-2 rounded bg-gray-800 text-white"
      />

      <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
    </div>
  );
}
