import AccessToken from "../models/accessToken.js";
import ApiErrorLog from "../models/apiErrorLog.js";

export const createTables = async () => {
  try {
    await AccessToken.sync({ alter: true });
    await ApiErrorLog.sync({ alter: true });
    console.log(
      "Las estructuras de tablas de Base de Datos han sido sincronizadas correctamente."
    );
  } catch (error) {
    console.error(
      "Error al sincronizar las estruturas de las tablas de la Base de Datos: ",
      error
    );
  }
};
