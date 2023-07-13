import rascalPkg from "rascal";
const { BrokerAsPromised: Broker } = rascalPkg;
import { startConsumerProduct } from "../messaging/consumers/productConsumer.js";
import rascalConfig from "./rascalConfig.js";
class BrokerManager {
  constructor() {
    this.broker = null;
  }
  
  async initBroker() {
    const maxRetries = 5;
    for (let i = 0; i < maxRetries; i++) {
      try {
        this.broker = await Broker.create(rascalConfig);
        console.log("Broker iniciado con éxito");
        startConsumerProduct();
        return; // Si la creación fue exitosa, salimos de la función
      } catch (error) {
        console.log(`No se pudo iniciar el Broker, intento ${i+1} de ${maxRetries}: `, error);
        if (i < maxRetries - 1) { // Si no estamos en el último intento
          await new Promise(resolve => setTimeout(resolve, 5000)); // Esperamos 5 segundos antes del próximo intento
        } else {
          console.error('Se han agotado los reintentos para iniciar el Broker. Por favor, revisa tu configuración y tu conexión a RabbitMQ.');
          throw error; // Lanzamos el error para manejarlo más arriba en la cadena de promesas
        }
      }
    }
  }  

  getBroker() {
    if (!this.broker) {
      throw new Error(
        "Broker no iniciado. Por favor llamar a initBroker primero."
      );
    }
    return this.broker;
  }
}

export default new BrokerManager();
