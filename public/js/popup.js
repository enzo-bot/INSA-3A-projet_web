export const id = "wordle-popup";
export const activeClass = "active";
export const messageSelector = "#message";
export const victoryMessage = "Gagné !";
export const defeatMessage  = "Perdu...";

const popup = document.getElementById(id);

export const isOpen = () => {
    return popup.classList.contains(activeClass);
}

export const open = (victory, restart) => {
    popup.querySelector(messageSelector).innerHTML = victory ? victoryMessage : defeatMessage;
    popup.classList.add(activeClass);
    popup.onclick = () => restart();
}

export const close = () => {
    popup.classList.remove("active");
}