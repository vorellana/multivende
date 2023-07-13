import ApiErrorLog from "../models/apiErrorLog.js";

const saveApiErrorLog = async (errorMessage, method) => {
  try {
    await ApiErrorLog.create({
      error_message: errorMessage,
      method: method,
      error_level: 1,
      status_code: 0,
    });
    console.log("Log de error registrado");
  } catch (error) {
    console.error("Error al registrar Log de error: ", error);
  }
};

export { saveApiErrorLog };
