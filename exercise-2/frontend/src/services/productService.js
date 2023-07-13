export const massiveUpdateProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/products/massive-update-stock`;

    const headers = {
      "Content-Type": "application/json",
      "Client-Id": import.meta.env.VITE_CLIENT_ID,
      "Client-Secret": import.meta.env.VITE_CLIENT_SECRET,
      "Merchant-Id": import.meta.env.VITE_MERCHANT_ID,
      "Warehouse-Id": import.meta.env.VITE_WHAREHOUSE_ID,
    };

    const response = await fetch(url, {
      method: "PUT",
      headers: headers
    });

    const data = await response.json();

    console.log("response 5 => ", data);
    if (response.status !== 200) {
      throw new Error("Error en la respuesta del servicio");
    }
    return data;
  } catch (error) {
    console.log(
      `Error al obtener información del Stock de Productos de la API externa: ${error}`
    );
    throw error;
  }
};

export const getProductsWithStock = async (code) => {
  try {
    // TODO: establecer variables de entorno
    const page = 1;
    const url = `${import.meta.env.VITE_BASE_URL}/products/stock?page=${page}`;
    
    const headers = {
      "Content-Type": "application/json",
      "Client-Id": import.meta.env.VITE_CLIENT_ID,
      "Client-Secret": import.meta.env.VITE_CLIENT_SECRET,
      "Merchant-Id": import.meta.env.VITE_MERCHANT_ID,
      "Warehouse-Id": import.meta.env.VITE_WHAREHOUSE_ID,
      Code: code,
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    console.log("final de: getProductsWithStock");
    console.log("response 5 => ", data);
    if (response.status !== 200) {
      throw new Error("Error en la respuesta del servicio");
    }
    return data;
  } catch (error) {
    console.log(
      `Error al obtener información del Stock de Productos de la API externa: ${error}`
    );
    throw error;
  }
};
