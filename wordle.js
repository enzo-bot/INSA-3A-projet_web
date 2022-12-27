import * as env from "dotenv";
import { default as express } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { hostname } from "os";

import * as api from "./api.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Chargement de l'environnement (fichier .env).
env.config();
const port = process.env.WORDLE_PORT;

const app = express();

// Création des routes de l'API.
app.use("/api", api.router);
// Création des routes depuis le dossier pubilc.
app.use(express.static(join(__dirname, "/public")));

// Chargement du dictionnaire.
api.loadDico(process.env.WORDLE_DICO);
// Démarrage de l'application.
app.listen(port, () => console.log(`[${hostname}] Wordle running on port ${port}.`));