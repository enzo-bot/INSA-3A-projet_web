// Nombres de lignes.
export const maxRows = 6;

export const regex = {
    letter: /[a-z]/i,
    space:  /[^A-Za-z\n]/g
};

export const transformWord = (word) => {
    return String(word).replace(regex.space, ' ').toUpperCase();
}