import {
  getProductsWithStock as getProductsWithStockServ,
  massiveUpdateOfProductStock as massiveUpdateOfProductStockServ,
  setProductsInQueue as setProductsInQueueServ,
} from "../services/productService.js";

const getProductsWithStock = async (req, res) => {
  try {
    const response = await getProductsWithStockServ(
      req.token,
      req.headers["merchant-id"],
      req.headers["warehouse-id"],
      req.query.page
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const massiveUpdateOfProductStock = async (req, res) => {
  try {
    const headers = {
      merchantId: req.headers["merchant-id"],
      warehouseId: req.headers["warehouse-id"],
      clientId: req.headers["client-id"],
    };
    const response = setProductsInQueueServ(req.token, headers);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getProductsWithStock, massiveUpdateOfProductStock };
