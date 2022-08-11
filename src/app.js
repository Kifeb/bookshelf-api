const hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = hapi.Server({
        host: "localhost",
        port: 5000,
        routes: {
            cors: {
              origin: ["*"],
            },
          },
    });

    server.route(routes)

    await server.start();
    console.log(`Server Running on ${server.info.uri}`);
};

init();


