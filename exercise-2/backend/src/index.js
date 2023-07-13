import app from "./app.js";
import sequelize from "./config/database.js";
import { createServer } from "http";
import { createTables } from "./utils/syncDB.js";
import BrokerManager from "./config/BrokerManager.js";
import SocketIOManager from "./config/SocketIOManager.js";
import { startConsumerProduct } from "./messaging/consumers/productConsumer.js";

const http = createServer(app);
SocketIOManager.createServer(http);

const PORT = process.env.PORT || 3001;

sequelize
  .authenticate()
  .then(async () => {
    console.log("Conexión a la base de datos establecida con éxito.");
    await createTables();
    await BrokerManager.initBroker();
    startConsumerProduct();

    http.listen(PORT, () => {
      console.log(`El servidor funciona en el puerto ${PORT}`);
    });
    
  })
  .catch((err) => {
    console.error("No se pudo conectar a la Base de Datos:", err);
  });
