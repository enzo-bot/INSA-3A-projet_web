import { Router, json } from "express";
import * as fs from "fs";
import { hostname } from "os";

export const router = Router();

// Activation de la transformation des requêtes en JSON.
router.use(json());

// Dictionnaire.
var dico = [];

// Chargement du fichier dictionnaire depuis le dossier dico.
export const loadDico = (file) => {
    console.debug(`[${hostname}] Loading dico from "${file}"...`);
    fs.readFile("./dico/" + file, 'utf-8', (err, data) => {
        if (err) console.error(err);
        dico = data.split('\n');
    });
}

// Retourne un mot aléatoire du dictionnaire.
const getWord = async (req, res) => {
    const rnd = Math.floor(Math.random() * (dico.length - 1));
    const word = dico[rnd];
    console.debug(`[${req.ip}] New game started with word "${word}".`);
    res.send(word);
};
router.get('/getWord', getWord);

// Vérifie qu'un mot appartient au dictionnaire.
const checkWord = async (req, res) => {
    const word = req.body.word.toUpperCase();
    const result = dico.includes(word);
    console.debug(`[${req.ip}] Checked word "${word}" : ${result}.`);
    res.send(String(result));
};
router.post('/checkWord', checkWord);