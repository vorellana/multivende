import AccessToken from "../models/accessToken.js";

const saveToken = async (tokenData) => {
  try {
    const token = await AccessToken.create(tokenData);
    console.log("Token de acceso creado: ", token);
    return token;
  } catch (error) {
    console.error("Error al crear token de acceso: ", error);
  }
};

const findToken = async (clientId) => {
  try {
    const token = await AccessToken.findOne({
      where: {
        client_id: clientId,
      },
      order: [["created_at", "DESC"]],
      raw: true,
    });
    return token;
  } catch (error) {
    console.error("Error al buscar token de acceso: ", error);
  }
};

export { saveToken, findToken };
