import * as config from "./config.js";
import * as cookie from "./cookie.js";
import * as board from "./board.js";
import * as keyboard from "./keyboard.js";
import * as popup from "./popup.js";
import * as score from "./score.js";
import * as timer from "./timer.js";

// Indique si le jeu est actif.
export var active = false;

// Lance une nouvelle partie.
export const start = () => {
    if (active) console.error("Wordle is already active.");
    else
    {
        if (popup.isOpen()) popup.close();
        // Création du plateau.
        board.create((perfect) => {
            timer.stop();
            active = false;
            score.register();
            popup.open(perfect, restart);
        });
        active = true;
        timer.start();
    }
};

export const restart = () => {
    active = false;
    timer.reset();
    start();
}

config.init();
if (cookie.isValid()) score.updateDisplay();
else cookie.reset();
keyboard.create(() => active, start);
start();