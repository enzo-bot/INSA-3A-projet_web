var jeu = null;
const maxTries = 6;

var word = ""
var wordSize = 0;
var input = [];
var caseStatus = [];
var rows = [];
var nRow = 0;
var nLetter = 0;

function checkRow()
{

}

function addLetter(letter)
{
    input.push(letter);
    updateCase();
    if (nLetter == wordSize - 1)
    {
        nLetter = 0;
        nRow++;
        checkRow();
        input = [];
        if (nRow == maxTries)
            newGame();
    }
    else nLetter++;
}

function removeLetter()
{
    if (nLetter > 0) nLetter--;
    input[nLetter] = "";
    updateCase();
}

function generateWord()
{
    return "TABLEAU";
}

function updateCase()
{
    rows[nRow].childNodes[nLetter].textContent = input[nLetter];
}

function generateGame()
{
    while (jeu.firstChild) jeu.removeChild(jeu.firstChild);
    for (let i = 0; i < maxTries; i++)
    {
        let row = document.createElement("div");
        row.classList.add("row");
        rows.push(row);
        jeu.appendChild(row);
        for (let j = 0; j < wordSize; j++)
        {
            let c = document.createElement("div");
            c.classList.add("case");
            row.appendChild(c);
        }
    }
}

addEventListener('keydown', (e) => {
    addLetter(String.fromCharCode(e.keyCode));
});

function newGame()
{
    word = generateWord();
    wordSize = word.length;
    input = [];
    caseStatus = [];
    rows = [];
    nRow = 0;
    nLetter = 0;

    generateGame();
}