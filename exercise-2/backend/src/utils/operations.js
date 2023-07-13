import Bottleneck from "bottleneck";
import { saveApiErrorLog } from "../repositories/apiErrorLogRepository.js";

const limiter = new Bottleneck({
  minTime: 200, // Mínimo tiempo entre solicitudes (en milisegundos)
});

const retryOperation = async (operation, method) => {
  let attempt = 0;

  const delay = 1000;
  const maxRetries = process.env.RETRIES_CALL_API;
  while (attempt < maxRetries) {
    try {
      // Intenta realizar la operación
      return await operation();
    } catch (err) {
      await saveApiErrorLog(err.message, method);
      // Si la operación falla, incrementa el intento y espera antes de intentarlo de nuevo
      attempt++;
      console.log(
        `Attempt ${attempt} failed. Retrying in ${delay * attempt} ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw new Error(`Operation failed after ${maxRetries} attempts.`);
};

const limitOperation = async (operation) => {
  return limiter.schedule(() => operation());
};

export { retryOperation, limitOperation };
