const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const gdrive = require("gdrive-dl-cli");

// Manifiesto del addon.
const manifest = {
  id: "com.ejemplo.gdrive-addon",
  version: "1.0.0",
  name: "Gdrive Movies",
  description: "Reproduce películas de Google Drive.",
  resources: ["catalog", "stream"],
  types: ["movie"],
  catalogs: [
    {
      type: "movie",
      id: "gdrive-catalog",
      name: "Mis Películas de Drive"
    }
  ]
};

const builder = new addonBuilder(manifest);

// Lista de películas y sus enlaces de Google Drive.
// **NOTA:** Aquí debes reemplazar "ID_DE_PELICULA" con el ID de la película real de IMDb
// y "LINK_DE_TU_DRIVE" con tu enlace real de Google Drive.
const movies = [
  {
    id: "tt1234567", // ID de ejemplo de IMDb
    name: "La Película del Drive",
    type: "movie",
    poster: "https://ejemplo.com/poster.jpg",
    description: "Esta película se reproduce desde Google Drive.",
    driveLink: "https://drive.google.com/file/d/ID_DE_TU_DRIVE/view"
  }
];

// Manejador del catálogo
builder.defineCatalogHandler(args => {
  if (args.type === "movie" && args.id === "gdrive-catalog") {
    const metas = movies.map(movie => ({
      id: movie.id,
      name: movie.name,
      type: movie.type,
      poster: movie.poster,
      description: movie.description
    }));
    return Promise.resolve({ metas });
  }
  return Promise.resolve({ metas: [] });
});

// Manejador de streams (la parte crucial)
builder.defineStreamHandler(args => {
  const movie = movies.find(m => m.id === args.id);
  if (movie) {
    return new Promise((resolve, reject) => {
      // Usa la librería para obtener el enlace directo del Drive
      gdrive.get(movie.driveLink, (error, directUrl) => {
        if (error) {
          console.error(error);
          return resolve({ streams: [] });
        }

        resolve({
          streams: [{ url: directUrl, title: "Google Drive" }]
        });
      });
    });
  }
  return Promise.resolve({ streams: [] });
});

// Inicia el servidor
serveHTTP(builder, { port: process.env.PORT || 7000 });
