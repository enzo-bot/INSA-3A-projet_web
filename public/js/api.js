// CONSTANTES
// URL de l'API.
const apiURL = "/api/";
// URL de la fonction getWord.
const getWordURL = apiURL + "getWord";
// URL de la fonction checkWorld.
const checkWordURL = apiURL + "checkWord";
// En-têtes HTTP des requêtes contenant du JSON.
const JSONHeaders = new Headers({ "Content-Type": "application/json" });

// Retourne un mot aléatoire (via l'API).
export const getWord = async () => {
    return fetch(getWordURL).then(
        res => res.text(),
        err => console.error(err)
    );
}

// Vérifie que le mot appartient au dictionnaire (via l'API).
export const checkWord = async (word) => {
    return fetch(checkWordURL, {
        method: "POST",
        headers: JSONHeaders,
        body: JSON.stringify({ word: word })
    }).then(
        res => res.text(),
        err => console.error(err)
    );
}