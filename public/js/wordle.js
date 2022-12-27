import * as board from "./board.js";
import * as keyboard from "./keyboard.js";
import * as popup from "./popup.js";

// Indique si le jeu est actif.
export var active = false;

// Lance une nouvelle partie.
export const start = () => {
    if (active)
        console.error("Wordle est déjà démarré.");
    else
    {
        if (popup.isOpen()) popup.close();
        // Création du plateau.
        board.create((victory) => {
            active = false;
            popup.open(victory, restart);
        });
        active = true;
    }
}

keyboard.create(() => active, start);
start();