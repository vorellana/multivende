import rascalPkg from "rascal";
const { BrokerAsPromised: Broker } = rascalPkg;

import rascalConfig from "./rascalConfig.js";

class BrokerManager {
  constructor() {
    this.broker = null;
  }

  async initBroker() {
    if (this.broker) return;
    try {
      this.broker = await Broker.create(rascalConfig);
      console.log("Broker iniciado con éxito");
    } catch (error) {
      console.error(error);
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
