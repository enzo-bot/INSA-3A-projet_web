import * as score from "./score.js";
import { revealWord } from "./board.js";

// ID de la fenêtre du popup.
export const id = "wordle-popup";
// ID du message de fin.
export const messageId = "message";
// ID du sous-message de fin incluant le mot.
export const submessageId = "submessage";
// ID du sous-message de fin incluant le score.
export const scoreMessageId = "scoreMessage";
// Classe HTML représentant l'activation du popup.
export const activeClass = "active";

const perfectMessage = "Gagné !";
const defeatMessage  = "Perdu...";

const createSubMessage = () => `Le mot était : <span id="word">${revealWord()}</span>`;
const createScoreMessage = () => {
    var message = `Score : <span>${score.current}</span>`;
    if (score.current === score.best)
        message += "<br>Vous avez battu votre meilleur score !";
    return message;
};

// Éléments HTML.
const popup = document.getElementById(id);
const message = document.getElementById(messageId);
const subMessage = document.getElementById(submessageId);
const scoreMessage = document.getElementById(scoreMessageId);

// Vérifie si le popup est actif.
export const isOpen = () => {
    return popup.classList.contains(activeClass);
};

// Active le popup.
export const open = (perfect, restart) => {
    message.innerHTML = perfect ? perfectMessage : defeatMessage;
    subMessage.innerHTML = createSubMessage();
    scoreMessage.innerHTML = createScoreMessage();
    popup.classList.add(activeClass);
    popup.onclick = () => restart();
};

// Désactive le popup.
export const close = () => {
    popup.classList.remove("active");
};