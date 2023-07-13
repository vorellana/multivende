import BrokerManager from "../config/BrokerManager.js";
import { publishMessageProduct } from "../messaging/producers/productProducer.js";
import { retryOperation, limitOperation } from "../utils/operations.js";
import { getToken } from "../services/tokenService.js";

const setProductsInQueue = (token, header) => {
  Promise.resolve().then(async () => {
    try {
      const getRandomInt = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
      const calcPercentage = (totalItems, currPage, limit) => {
        console.log(("calcPercentage => ", totalItems, currPage, limit));
        const percentage = (currPage * limit * 100) / totalItems;
        return Number(percentage.toFixed(2));
      };
      const broker = BrokerManager.getBroker();
      let currentPage = 1; // TODO cambiar a 1

      while (true) {
        // En caso de error reintenta 5 veces la misma solicitud
        // Y está limitado a realizar 5 solicitudes por segundo
        const response = await retryOperation(
          () =>
            limitOperation(() =>
              getProductsWithStock(
                token,
                header.merchantId,
                header.warehouseId,
                currentPage
              )
            ),
          "GET"
        );

        if (
          !(
            response.entries.length > 0 &&
            response.pagination.total_items - response.pagination.offset > 0
          )
        ) {
          break;
        }

        const message = {
          clientId: header.clientId,
          warehouseId: header.warehouseId,
          percentage: calcPercentage(
            response.pagination.total_items,
            response.pagination.current_page,
            response.pagination.limit
          ),
          data: response.entries.map((p) => ({
            code: p.code,
            amount: getRandomInt(100, 1000),
          })),
        };

        await publishMessageProduct(broker, message);
        currentPage++;
      }
    } catch (err) {
      console.log("Error en setProductsInQueue: ", err);
    }
  });

  // Retorna la respuesta inmediatamente, pera las demás operaciones se realizan
  return {
    status: "En proceso",
    message:
      "La actualización masiva del Stock de Productos se encuentra en proceso",
  };
};

const getProductsWithStock = async (token, merchantId, warehouseId, page) => {
  try {
    const url = `${process.env.BASE_URL}/api/m/${merchantId}/product-versions/p/${page}?_include_stock=true&_warehouse_id=${warehouseId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(
        `getProductsWithStock: HTTP error! estado: ${response.status}`
      );
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error(
      `Error al obtener información del Stock de Productos de la API externa: ${error}`
    );
    throw error;
  }
};

const massiveUpdateOfProductStock = async (
  token,
  body,
  warehouseId,
  client_id
) => {
  try {
    if (!token) {
      const tokenData = await getToken(client_id);
      token = tokenData.token;
    }

    const url = `${process.env.BASE_URL}/api/product-stocks/stores-and-warehouses/${warehouseId}/bulk-set`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    // SI SUCEDE ERROR VERIFICAR SI ES POR AUTORIZACIÓN Y REINTENTAR
    console.error(
      `Error al actualizar información del Stock de Productos de la API externa: ${error}`
    );
    throw error;
  }
};

export {
  getProductsWithStock,
  massiveUpdateOfProductStock,
  setProductsInQueue,
};
