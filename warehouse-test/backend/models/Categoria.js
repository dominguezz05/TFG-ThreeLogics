import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "categorias",
    timestamps: true,
  }
);

export default Categoria;
