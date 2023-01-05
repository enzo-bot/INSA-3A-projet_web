import * as cookie from "./cookie.js";
import { transformWord } from "./common.js";

const dicoCookie = "dico";
const maxLengthCookie = "maxLength";

// URL de l'API.
const apiURL = "/api/";
// URL de la fonction getDicos.
const getDicosURL = apiURL + "getDicos";
// URL de la fonction getWord.
const getWordURL = apiURL + "getWord";
// URL de la fonction checkWorld.
const checkWordURL = apiURL + "checkWord";

// En-têtes HTTP des requêtes contenant du JSON.
const JSONHeaders = new Headers({ "Content-Type": "application/json" });

export var currentDico = cookie.getValue(dicoCookie) ?? "fr/dictionnaire";

export var currentMaxLength = cookie.getValue(maxLengthCookie) ?? 5;

export var dicos = [];

export const updateDicos = async () => {
    return fetch(getDicosURL).then(
        res => res.text().then(
            res => dicos = JSON.parse(res),
            err => console.error(err)
        ),
        err => console.error(err)
    );
};

export const setDico = (dico) => {
    if (dicos.includes(dico))
    {
        currentDico = String(dico);
        cookie.setValue(dicoCookie, currentDico);
    }
};

export const setMaxLength = (maxLength) => {
    maxLength = parseInt(maxLength);
    if (maxLength > 1)
    {
        currentMaxLength = maxLength;
        cookie.setValue(maxLengthCookie, currentMaxLength);
    }
}

const createRequest = (body = {}) => {
    if (!!currentDico) body.dico = currentDico;
    return {
        method: "POST",
        headers: JSONHeaders,
        body: JSON.stringify(body)
    };
};

// Retourne un mot aléatoire.
export const getWord = async () => {
    return fetch(getWordURL, createRequest({
        "maxLength": currentMaxLength
    })).then(
        res => res.text(),
        err => console.error(err)
    );
};

// Vérifie que le mot appartient au dictionnaire.
export const checkWord = async (word) => {
    return fetch(checkWordURL, createRequest({ "word": transformWord(word) })).then(
        res => res.text(),
        err => console.error(err)
    );
};