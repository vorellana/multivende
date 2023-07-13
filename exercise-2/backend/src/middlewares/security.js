import { authenticate, getToken } from "../services/tokenService.js";
import TokenManager from "../security/TokenManager.js";

async function handleAuthentication(headers, tokenData) {
  if (
    !tokenData ||
    (tokenData["isExpired"] && tokenData["isRefreshTokenExpired"])
  ) {
    return await authenticate(headers, null); // Autenticación inicial: por token vacio o ambos tokens vencidos
  } else if (tokenData["isExpired"]) {
    const response = await authenticate(headers, tokenData.refresh_token); // Refrescar token: solo si el token inicial está vencido
    if (response) {
      return response;
    }
    return await authenticate(headers, null);
  }
  return tokenData.token; // Si ambos tokens están válidos
}

const verifyToken = async (req, res, next) => {
  try {
    const clientId = req.headers["client-id"];
    const clientSecret = req.headers["client-secret"];
    const code = req.headers["code"];
    const headers = { clientId, clientSecret, code };
    const tokenData = await getToken(clientId);
    const validToken = await handleAuthentication(headers, tokenData);
    if (!validToken) {
      return res.status(401).send("Autorización por Token inválida");
    }

    req.token = validToken;
    TokenManager.setToken(validToken, null);
  } catch (error) {
    console.log(error);
    return res.status(500).send("¡Algo salió mal!");
  }
  next();
};

export { verifyToken };
