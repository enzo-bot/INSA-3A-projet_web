// ID HTML de la fenêtre du popup.
export const id = "wordle-popup";
// Classe HTML représentant l'activation du popup.
export const activeClass = "active";
// Sélecteur HTML du message de fin.
export const messageSelector = "#message";

export const victoryMessage = "Gagné !";
export const defeatMessage  = "Perdu...";

// Élément HTML.
const popup = document.getElementById(id);

// Vérifie si le popup est actif.
export const isOpen = () => {
    return popup.classList.contains(activeClass);
}

// Active le popup.
export const open = (victory, restart) => {
    popup.querySelector(messageSelector).innerHTML = victory ? victoryMessage : defeatMessage;
    popup.classList.add(activeClass);
    popup.onclick = () => restart();
}

// Désactive le popup.
export const close = () => {
    popup.classList.remove("active");
}