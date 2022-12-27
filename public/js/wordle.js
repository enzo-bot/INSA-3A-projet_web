import * as board from "./board.js";
import * as keyboard from "./keyboard.js";
import * as popup from "./popup.js";

// Indique si le jeu est actif.
export var active = false;

export const start = () => {
    if (active)
        console.error("Wordle est déjà démarré.");
    else
    {
        board.create((victory) => {
            active = false;
            popup.open(victory, restart);
        });
        active = true;
    }
}

export const restart = () => {
    popup.close();
    start();
}

if (popup.isOpen()) popup.close();
keyboard.create(() => active, restart);
start();