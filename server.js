const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const manifest = require("./manifest.json");

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(async ({ id }) => {
  if (id === "ejemplo_catalog") {
    return Promise.resolve({
      metas: [
        {
          id: "tt1234567",
          name: "La Película de Ejemplo",
          type: "movie",
          poster: "https://ejemplo.com/poster.jpg",
          description: "Esta es la descripción de la película de ejemplo."
        }
      ]
    });
  }
  return Promise.resolve({ metas: [] });
});

builder.defineStreamHandler(async ({ id, type }) => {
  if (type === "movie" && id === "tt1234567") {
    return Promise.resolve({
      streams: [
        {
          url: "https://ejemplo.com/video.mp4",
          title: "Streaming de Ejemplo"
        }
      ]
    });
  }
  return Promise.resolve({ streams: [] });
});

serveHTTP(builder, { port: process.env.PORT || 7000 });
