import BrokerManager from "../../config/BrokerManager.js";
import { massiveUpdateOfProductStock } from "../../services/productService.js";
import { getNow } from "../../utils/time.js";
import SocketIOManager from "../../config/SocketIOManager.js";
import { retryOperation, limitOperation } from "../../utils/operations.js";

const startConsumerProduct = async () => {
  try {
    const broker = BrokerManager.getBroker();
    const subscription = await broker.subscribe("sub");

    subscription
      .on("message", async (message, content, ackOrNack) => {
        try {
          console.log("startConsumerProduct: " + getNow() + " => ", content);

          // API UPDATE PRODUCTS
          const response = await retryOperation(
            () =>
              limitOperation(() =>
                massiveUpdateOfProductStock(
                  null,
                  content.data,
                  content.warehouseId,
                  content.clientId
                )
              ),
            "POST"
          );

          SocketIOManager.getIO().emit("message", {
            percentage: content.percentage.toString(),
          });

          ackOrNack();
        } catch (error) {
          console.error(
            "startConsumerProduct: Error procesando el mensaje:",
            error
          );
          // Rechaza el mensaje en caso de error
          ackOrNack(error);
        }
      })
      .on("error", console.error);

    console.log("Suscripción exitosa a 'sub'");
  } catch (error) {
    console.error("Error al suscribirse a la cola:", error);
  }
};

export { startConsumerProduct };
