import * as config from "./config.js";
import * as board from "./board.js";
import { popup } from "./popup.js";
import { regex } from "./common.js";

// ID du clavier.
export const id = "wordle-keyboard";
// ID de la touche de suppression.
export const deleteKeyId = "delete";
// ID de la touche d'entrée.
export const enterKeyId = "enter";

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
            let hasBeenUsed = true;
            if (isActive())
            {
                if(e.key.length === 1 && e.key.match(regex.letter)) board.addLetter(e.key);
                else if(e.key === "Backspace" && !config.isSelected) board.removeLetter();
                else if(e.key === "Enter") board.checkRow();
                else hasBeenUsed = false;
            }
            else if (e.key === "Enter") popup.click();
            else hasBeenUsed = false;
            if (hasBeenUsed) e.preventDefault();
        });
        created = true;
    }
    else console.error("Clavier déjà créé.");
}
