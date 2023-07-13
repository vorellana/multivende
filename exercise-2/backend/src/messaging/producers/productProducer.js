import { getNow } from "../../utils/time.js";

const publishMessageProduct = async (broker, message) => {
  try {
    // Publish a message
    const publication = await broker.publish("pub", message);
    publication.on("error", console.error);
    console.log("publishMessageProduct: " + getNow() + " => ", message);
  } catch (error) {
    console.error("Error al iniciar el Productor: ", error);
  }
};

export { publishMessageProduct };
