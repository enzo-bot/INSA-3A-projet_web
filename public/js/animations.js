const cellAnimationDuration = 200;
const rowAnimationDuration = 500;

export const animateCell = (row, letter) => {
    row.childNodes[letter].classList.add("active");
    setTimeout(
        () => row.childNodes[letter].classList.remove("active"),
        cellAnimationDuration
    );
};

export const animateRow = (row) => {
    row.classList.add("active");
    setTimeout(
        () => row.classList.remove("active"),
        rowAnimationDuration
    );
};