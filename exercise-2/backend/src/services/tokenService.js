import CryptoJS from "crypto-js";
import {
  findToken,
  saveToken as saveTokenRep,
} from "../repositories/tokenRepository.js";

const getToken = async (clientId) => {
  try {
    const tokenData = await findToken(clientId);
    if (tokenData) {
      tokenData["isExpired"] = new Date() > new Date(tokenData.expires_at);
      tokenData["isRefreshTokenExpired"] =
        new Date() > new Date(tokenData.refresh_token_expires_at);
      tokenData["token"] = CryptoJS.AES.decrypt(
        tokenData["token"],
        process.env.TOKEN_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      tokenData["refresh_token"] = CryptoJS.AES.decrypt(
        tokenData["refresh_token"],
        process.env.TOKEN_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      return tokenData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener los datos  del token: ${error}`);
    throw error;
  }
};

const saveToken = async (tokenData, clientId) => {
  try {
    tokenData["id"] = tokenData["_id"];
    tokenData["client_id"] = clientId;
    tokenData["oauth_client_id"] = tokenData["OauthClientId"];
    tokenData["merchant_id"] = tokenData["MerchantId"];
    tokenData["merchant_app_id"] = tokenData["MerchantAppId"];
    tokenData["created_by_id"] = tokenData["CreatedById"];
    tokenData["updated_by_id"] = tokenData["UpdatedById"];
    tokenData["owner_id"] = tokenData["OwnerId"];
    tokenData["expires_at"] = tokenData["expiresAt"];
    tokenData["refresh_token"] = tokenData["refreshToken"];
    tokenData["refresh_token_expires_at"] = tokenData["refreshTokenExpiresAt"];
    tokenData["updated_at"] = tokenData["updatedAt"];
    tokenData["created_at"] = tokenData["createdAt"];
    tokenData["token"] = CryptoJS.AES.encrypt(
      tokenData["token"],
      process.env.TOKEN_SECRET_KEY
    ).toString();
    tokenData["refresh_token"] = CryptoJS.AES.encrypt(
      tokenData["refreshToken"],
      process.env.TOKEN_SECRET_KEY
    ).toString();

    const token = await saveTokenRep(tokenData);
    return token;
  } catch (error) {
    console.error(`Error al guardar el token: ${error}`);
    throw error;
  }
};

const authenticate = async (headers, refreshToken) => {
  try {
    const url = process.env.BASE_URL + "/oauth/access-token";
    const data = {
      client_id: headers.clientId,
      client_secret: headers.clientSecret,
      grant_type: headers.grantType,
    };

    if (refreshToken) {
      data["refresh_token"] = refreshToken;
      data["grant_type"] = "refresh_token";
    } else {
      data["code"] = headers.code;
      data["grant_type"] = "authorization_code";
    }
    // console.log('1157. Datos de acceso: ', {url, headers, data })
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log('1157. Datos retorno: ', response.status)
    console.log({response});

    const responseJson = await response.json();
    if (response.status === 200) {
      const originalToken = responseJson["token"];
      responseJson["type_token"] = data["refresh_token"]
        ? "refresh"
        : "initial";
      await saveToken(responseJson, data.client_id);
      return originalToken;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error: token.service.js Authenticate: ', error);
  }
};

export { getToken, saveToken, authenticate };
