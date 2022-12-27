import * as api from "./api.js";
import { animateCell, animateRow } from "./animations.js";

// ID HTML du plateau.
export const id = "wordle-board";
// Nombres de lignes.
export const maxRows = 6;

const board = document.getElementById(id);
var rows = [];
var finish = null;

// Mot à trouver.
var word = ""
// Taille du mot à trouver.
var wordSize = 0;
// Contenu textuel de la ligne courante.
var input = "";
// Index de la ligne courante.
var nRow = 0;
// Index de la case courante.
var nLetter = 0;

// Vérifie la ligne courante du tableau et passe à la suivante.
export const checkRow = () => {
    if (nLetter === wordSize)
        api.checkWord(input).then(
            res => {
                // Si le mot appartient au dictionnaire, on vérifie et on passe à la ligne suivante.
                if (res === "true")
                {
                    nLetter = 0;
                    // Le mot est le bon => VICTOIRE !
                    if (input === word)
                    {
                        for (let i = 0; i < wordSize; i++)
                        {
                            rows[nRow].childNodes[i].classList.add("victory");
                            animateCell(rows[nRow], i);
                        }
                        finish(true);
                    }
                    // Le mot n'est pas le bon...
                    else
                    {
                        const last = wordSize - 1;
                        let j;
                        // Vérification lettre à lettre.
                        for (let i = 0; i < wordSize; i++)
                        {
                            // La lettre est au bon endroit => PARFAIT !
                            if (input[i] === word[i])
                                rows[nRow].childNodes[i].classList.add("victory");
                            // La lettre n'est pas au bon endroit.
                            else
                            {
                                for(j = 0; j < wordSize; j++)
                                {
                                    // Mais est dans le mot => CORRECT !
                                    if (input[i] === word[j])
                                    {
                                        rows[nRow].childNodes[i].classList.add("correct");
                                        break;
                                    }
                                }
                                // Elle n'est pas de le mot => ERREUR !
                                if (j === wordSize)
                                    rows[nRow].childNodes[i].classList.add("wrong");
                            }
                            animateCell(rows[nRow], i);
                        }
                        nRow++;
                        // Si on a vérifié la dernière ligne => PERDU !
                        if (nRow == maxRows) finish(false);
                        else input = "";
                    }
                }
                // Si le mot n'est pas dans le dictionnaire, on anime la ligne.
                else animateRow(rows[nRow]);
            },
            err => console.error(err)
        );
}

export const addLetter = (letter) => {
    if (nLetter < wordSize)
    {
        input += letter.toLowerCase();
        rows[nRow].childNodes[nLetter].innerHTML = input[nLetter];
        animateCell(rows[nRow], nLetter);
        nLetter++;
        if (nLetter == wordSize) checkRow();
    }
    else checkRow();
}

export const removeLetter = () => {
    if (nLetter > 0)
    {
        nLetter--;
        input = input.slice(0, nLetter),
        rows[nRow].childNodes[nLetter].innerHTML = "";
        animateCell(rows[nRow], nLetter);
    }
}

export const create = async (finisher) => {
    finish = finisher;
    api.getWord().then(
        txt => {
            word = txt.toLowerCase();
            wordSize = word.length;
            input = "";
            rows = [];
            nRow = 0;
            nLetter = 0;
            
            while (board.firstChild) board.removeChild(board.firstChild);
            let j;
            for (let i = 0; i < maxRows; i++)
            {
                let row = document.createElement("div");
                row.classList.add("row");
                rows.push(row);
                board.appendChild(row);
                for (j = 0; j < wordSize; j++)
                {
                    let c = document.createElement("div");
                    c.classList.add("cell");
                    row.appendChild(c);
                    animateCell(rows[i], j);
                }
            }
        },
        err => console.error(err)
    );
}