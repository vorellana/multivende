import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ApiErrorLog = sequelize.define(
  "ApiErrorLog",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    error_level: DataTypes.TEXT,
    method: DataTypes.STRING,
    error_message: DataTypes.TEXT,
    status_code: DataTypes.INTEGER,
    ip: DataTypes.STRING,
  },
  {
    tableName: "api_error_logs",
  }
);

export default ApiErrorLog;
