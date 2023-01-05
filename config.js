import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as env from "dotenv";

// CONSTANTES

export const dir = dirname(fileURLToPath(import.meta.url));

// Chargement des variables d'environnement.
env.config();

export const name = process.env.WORDLE_NAME ?? "wordle";

export const port = process.env.WORDLE_PORT;

export const publicRoot = join(dir, process.env.WORDLE_PUBLIC_DIR ?? "public");

export const dicoRoot = join(dir, process.env.WORDLE_DICO_DIR ?? "dico");

export const apiURL = "/" + (process.env.WORDLE_API_URL ?? "api");

export const minLength = process.env.WORDLE_MIN_LENGTH ?? 4;

export const defaultDico = process.env.WORDLE_DEFAULT_DICO;

export const defaultMaxLength = process.env.WORDLE_DEFAULT_MAX_LENTGH ?? 5;