import * as board from "./board.js";

// ID HTML du clavier.
export const id = "wordle-keyboard";
// ID HTML de la touche de suppression.
export const deleteKeyId = "delete";
// ID HTML de la touche d'entrée.
export const enterKeyId = "enter";

// RegExp des lettres de l'alphabet.
export const letterRegex = /[a-z]/i;

// Élément HTML.
const keyboard = document.getElementById(id);

// Détermine si le clavier a été créé.
export var created = false;

// Créé le clavier.
export const create = (isActive, restart) => {
    if (created === false)
    {
        // Création du clavier à partir du tableau HTML
        const keys = keyboard.querySelectorAll("td");
        if (!!keys)
            keys.forEach(key => {
                if (key.childElementCount === 0)
                    key.onclick = (e) => board.addLetter(key.innerHTML);
                else if (key.id === deleteKeyId)
                    key.onclick = (e) => board.removeLetter();
                else if ((key.id === enterKeyId))
                    key.onclick = (e) => board.checkRow();
            });
        // Activation de l'écoute du clavier physique.
        document.addEventListener('keydown', (e) => {
            if (e.altKey || e.ctrlKey) return;
            if (isActive())
            {
                if(e.key.length === 1 && e.key.match(letterRegex)) board.addLetter(e.key);
                else if(e.key === "Backspace") board.removeLetter();
                else if(e.key === "Enter") board.checkRow();
            }
            else if (e.key === "Enter") restart();
        });
        created = true;
    }
    else console.error("Clavier déjà créé.");
}
