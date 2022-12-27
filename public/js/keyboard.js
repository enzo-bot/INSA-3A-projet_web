import * as board from "./board.js";

// ID HTML du clavier.
export const id = "wordle-keyboard";
// RegExp des lettres de l'alphabet.
export const letterRegex = /[a-z]/i;

// Élément HTML.
const keyboard = document.getElementById(id);

// Créé le clavier à partir du tableau HTML et active l'écoute du clavier physique.
export const create = (isActive, restart) => {
    const keys = keyboard.querySelectorAll("td");
    if (!!keys)
        keys.forEach(key => {
            if (key.childElementCount === 0)
                key.onclick = (e) => board.addLetter(key.innerHTML);
            else if (key.id === "delete")
                key.onclick = (e) => board.removeLetter();
            else if ((key.id === "enter"))
                key.onclick = (e) => board.checkRow();
        });
    
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
}
