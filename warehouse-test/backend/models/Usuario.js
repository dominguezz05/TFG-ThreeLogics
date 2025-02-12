import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("admin", "usuario"), // ✅ Asegurar que solo puede ser "admin" o "usuario"
    allowNull: false,
    defaultValue: "usuario", // ✅ Si no se envía, por defecto será "usuario"
  },
  lastPasswordChange: {
    type: DataTypes.DATE, // ✅ Guardar fecha del último cambio de contraseña
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  imagenPerfil: {
    type: DataTypes.BLOB("medium"), // ✅ Esto almacena hasta 16 MB de datos binarios
    allowNull: true,
  },
});

export default Usuario;
