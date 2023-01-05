import * as api from "./api.js";
import * as score from "./score.js";
import { animateCell, animateRow } from "./animations.js";
import { regex, maxRows } from "./common.js";

// ID du plateau.
export const id = "wordle-board";

export const spaceClass = "space";
export const cellClass  = "cell";

export const perfectCharClass   = "perfect";
export const correctCharClass   = "correct";
export const wrongCharClass     = "wrong";

// Élément HTML.
const board = document.getElementById(id);
// Tableau des lignes HTML.
var rows = [];

// Fonction appelée à la fin d'une partie.
var finish = null;

// Mot à trouver.
var word = ""
// Taille du mot à trouver.
var wordLength = 0;
// Contenu textuel de la ligne courante.
var input = "";
// Index de la ligne courante.
var nRow = 0;
// Index de la case courante.
var nLetter = 0;
var perfectChars = 0;
var correctChars = 0;

export const revealWord = () => {
    const exWord = word;
    word = "";
    return exWord;
};

// Vérifie la ligne courante du tableau et passe à la suivante.
export const checkRow = () => {
    if (nLetter === wordLength)
        api.checkWord(input).then(
            res => {
                // Si le mot appartient au dictionnaire, on vérifie et on passe à la ligne suivante.
                if (res === "true")
                {
                    nLetter = 0;
                    // Le mot est le bon => VICTOIRE !
                    if (input === word)
                    {
                        for (let i = 0; i < wordLength; i++)
                        {
                            if (word[i] === ' ') continue;
                            rows[nRow].childNodes[i].classList.add(perfectCharClass);
                            animateCell(rows[nRow], i);
                        }
                        perfectChars += wordLength;
                        score.compute(nRow, wordLength, perfectChars, correctChars);
                        finish(true);
                    }
                    // Le mot n'est pas le bon...
                    else
                    {
                        const last = wordLength - 1;
                        let j;
                        // Vérification lettre à lettre.
                        for (let i = 0; i < wordLength; i++)
                        {
                            if (word[i] === ' ') continue;
                            // La lettre est au bon endroit => PARFAIT !
                            if (input[i] === word[i])
                            {
                                rows[nRow].childNodes[i].classList.add(perfectCharClass);
                                perfectChars++;
                            }
                            // La lettre n'est pas au bon endroit.
                            else
                            {
                                for(j = 0; j < wordLength; j++)
                                {
                                    // Mais est dans le mot => CORRECT !
                                    if (input[i] === word[j])
                                    {
                                        rows[nRow].childNodes[i].classList.add(correctCharClass);
                                        correctChars++;
                                        break;
                                    }
                                }
                                // Elle n'est pas dans le mot => ERREUR !
                                if (j === wordLength)
                                    rows[nRow].childNodes[i].classList.add(wrongCharClass);
                            }
                            animateCell(rows[nRow], i);
                        }
                        nRow++;
                        // Si on a vérifié la dernière ligne => PERDU !
                        if (nRow == maxRows)
                        {
                            score.compute(nRow, wordLength, perfectChars, correctChars);
                            finish(false);
                        }
                        else input = "";
                    }
                }
                // Si le mot n'est pas dans le dictionnaire, on anime la ligne.
                else animateRow(rows[nRow]);
            },
            err => console.error(err)
        );
};

// Ajoute une lettre à la ligne courante du plateau.
export const addLetter = (letter) => {
    if (nLetter < wordLength)
    {
        input += letter.toLowerCase();
        rows[nRow].childNodes[nLetter].innerHTML = input[nLetter];
        animateCell(rows[nRow], nLetter);
        nLetter++;
        while (!!rows[nRow].childNodes[nLetter] && rows[nRow].childNodes[nLetter].classList.contains(spaceClass))
        {
            input += ' ';
            nLetter++;
        }
        if (nLetter == wordLength) checkRow();
    }
    else checkRow();
};

// Ajoute la dernière lettre de la ligne courante du plateau.
export const removeLetter = () => {
    if (nLetter > 0)
    {
        nLetter--;
        while (!!rows[nRow].childNodes[nLetter] && rows[nRow].childNodes[nLetter].classList.contains(spaceClass))
        {
            input = input.slice(0, nLetter);
            nLetter--;
        }
        input = input.slice(0, nLetter);
        rows[nRow].childNodes[nLetter].innerHTML = "";
        animateCell(rows[nRow], nLetter);
    }
};

// Créer le plateau HTML et initialise la partie.
export const create = async (finisher) => {
    finish = finisher;
    // Obtention d'un mot aléatoire depuis l'API.
    api.getWord().then(
        txt => {
            word = txt.toLowerCase();
            wordLength = word.length;
            input = "";
            rows = [];
            nRow = 0;
            nLetter = 0;
            // Suppression des éléments HTML existants.
            while (board.firstChild) board.removeChild(board.firstChild);
            // Création des éléments HTML.
            let j;
            for (let i = 0; i < maxRows; i++)
            {
                let row = document.createElement("div");
                row.classList.add("row");
                rows.push(row);
                board.appendChild(row);
                for (j = 0; j < wordLength; j++)
                {
                    let c = document.createElement("div");
                    if (word[j].match(regex.space)) c.classList.add(spaceClass);
                    else c.classList.add(cellClass);
                    row.appendChild(c);
                    animateCell(rows[i], j);
                }
            }
        },
        err => console.error(err)
    );
};