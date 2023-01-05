import { Router, json } from "express";
import * as fs from "fs";
import { join } from "path";

import * as config from "./config.js";
import { transformWord } from "./public/js/common.js";

export const router = Router();

// Activation de la transformation des requêtes en JSON.
router.use(json());

// Dictionnaires.
var dicos = {};

var dicoFiles = [];

// Ajout des fichiers de dictionnaire depuis le dossier configuré.
export const addDicoFiles = (dir) => {
    const dirPath = join(config.dicoRoot, dir);
    fs.readdir(dirPath, (err, files) => {
        if (!!err) console.error(err);
        else
        {
            files.forEach((file) => {
                const relativeFilePath = dir + "/" + file;
                if (fs.lstatSync(join(dirPath, file)).isDirectory()) addDicoFiles(file);
                else
                {
                    dicoFiles.push(relativeFilePath);
                    console.debug(`[${config.name}.api] Added a new dico file : ${relativeFilePath}`);
                }
            });
        }
    });
}
addDicoFiles("");

// Chargement d'un fichier dictionnaire préalablement renseigner via addDicoFiles.
export const loadDico = (file) => {
    const dicoFile = String(file).split('..')[0];
    if (dicoFiles.includes(dicoFile))
    {
        console.debug(`[${config.name}.api] Loading dico from "${dicoFile}"...`);
        dicos[file] = transformWord(fs.readFileSync(join(config.dicoRoot, dicoFile), { encoding: 'utf-8', flag: 'r'})).split('\n');
    }
    else console.error(`[${config.name}.api] Unable to load dico from "${dicoFile}".`)
};

// Détermine le dictionnaire à utiliser selon la requête et charge le dictionnaire si nécessaire.
export const getDicoFromRequest = (req, forceUpdate = false) => {
    const dicoFile = (!!req.body.dico && dicoFiles.includes(req.body.dico)) ? req.body.dico : config.defaultDico;
    const update = (!!req.body.update) ? Boolean(req.body.update) : forceUpdate;
    if (update || typeof dicos[dicoFile] === 'undefined') loadDico(dicoFile);
    return dicos[dicoFile];
};

export const getWordConfigFromRequest = (req) => {
    var maxLength = !!req.body.maxLength ? req.body.maxLength : config.defaultMaxLength;
    if (maxLength < config.minLength) maxLength = config.minLength;
    return (word) => {
        return word.length <= maxLength;
    }
}

// ROUTES

// Retourne la liste des fichiers disponibles.
export const getDicos = async (req, res) => {
    res.send(JSON.stringify(dicoFiles))
};
router.get('/getDicos', getDicos)

// Retourne un mot aléatoire du dictionnaire.
export const getWord = async (req, res) => {
    const dico = getDicoFromRequest(req);
    const wordConfig = getWordConfigFromRequest(req);
    var index = Math.floor(Math.random() * (dico.length - 1));
    var word = dico[index];
    while (!wordConfig(word))
    {
        index++;
        if (index === dico.length) index = 0;
        word = dico[index];
    }
    console.debug(`[${config.name}.api@${req.ip}] New game started with word "${word}".`);
    res.send(word);
};
router.post('/getWord', getWord);

// Vérifie qu'un mot appartient au dictionnaire.
export const checkWord = async (req, res) => {
    if (!!req.body.word)
    {
        const word = transformWord(req.body.word);
        const result = getDicoFromRequest(req).includes(word);
        console.debug(`[${config.name}.api@${req.ip}] Checked word "${word}" : ${result}.`);
        res.send(String(result));
    }
    else res.send(String(false));
};
router.post('/checkWord', checkWord);