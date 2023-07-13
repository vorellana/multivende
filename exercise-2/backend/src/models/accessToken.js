import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AccessToken = sequelize.define(
  "AccessToken",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    type_token: DataTypes.TEXT, // initial or refresh
    status: DataTypes.STRING,
    client_id: DataTypes.STRING,
    oauth_client_id: DataTypes.STRING,
    merchant_id: DataTypes.STRING,
    merchant_app_id: DataTypes.STRING,
    created_by_id: DataTypes.STRING,
    updated_by_id: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    scopes: DataTypes.JSONB,
    expires_at: DataTypes.DATE,
    refresh_token: DataTypes.STRING,
    refresh_token_expires_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE,
    token: DataTypes.TEXT,
  },
  {
    tableName: "access_token",
  }
);

export default AccessToken;
