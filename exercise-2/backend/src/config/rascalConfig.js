// Configuración de Rascal
const rascalConfig = {
  vhosts: {
    "/": {
      connection: {
        hostname: "localhost",
      },
      exchanges: ["direct-exchange"],
      queues: [
        {
          name: "cola-rascal-2",
          options: {
            durable: true, // Cola declarada como durable
          },
        },
      ],
      bindings: [
        {
          source: "direct-exchange",
          destination: "cola-rascal-2",
          bindingKey: "key",
        },
      ],
      publications: {
        pub: {
          exchange: "direct-exchange",
          routingKey: "key",
        },
      },
      subscriptions: {
        sub: {
          queue: "cola-rascal-2",
        },
      },
    },
  },
};

export default rascalConfig;
