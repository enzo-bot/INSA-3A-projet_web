import * as env from "dotenv";
import { default as express } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { hostname } from "os";

import * as api from "./api.js";

// Chargement du fichier d'environnement (.env).
env.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.WORDLE_PORT;

// Routes
app.use("/api", api.router);
app.use(express.static(join(__dirname, "/public")));

// Démarrage
api.loadDico(process.env.WORDLE_DICO);
app.listen(port, () => console.log(`[${hostname}] Wordle running on port ${port}.`));