import { default as express } from "express";
import { hostname } from "os";

import * as config from "./config.js";
import * as api from "./api.js";

const app = express();

// Création des routes de l'API.
app.use(config.apiURL, api.router);
console.debug(`[${config.name}] API routes created (${config.apiURL} -> api.router).`)
// Création des routes depuis le dossier pubilc.
app.use(express.static(config.publicRoot));
console.debug(`[${config.name}] Routes created from public folder (/ -> ${config.publicRoot}).`)

// Démarrage de l'application.
app.listen(config.port, () => console.debug(`[${config.name}] Started on : http://${hostname}:${config.port}/`));