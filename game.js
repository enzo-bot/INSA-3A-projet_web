const maxTries = 6;

var active = false;

var game = null;
var keyboard = null;
var popup = null;

var word = ""
var wordSize = 0;
var input = "";
var rows = [];
var nRow = 0;
var nLetter = 0;

function checkRow()
{
    nLetter = 0;

    if (String(input) === word)
    {
        for (let i = 0; i < wordSize; i++)
            rows[nRow].childNodes[i].classList.add("victory");
        finish(true);
    }
    else
    {
        const last = wordSize - 1;
        for (let i = 0; i < wordSize; i++)
        {
            if (input[i] === word[i])
                rows[nRow].childNodes[i].classList.add("correct");
            else
                rows[nRow].childNodes[i].classList.add("wrong");
        }
        nRow++;
        if (nRow == maxTries)
            finish(false);
        else input = "";
    }
}

function addLetter(letter)
{
    if (nLetter < wordSize)
    {
        input += letter.toLowerCase();
        rows[nRow].childNodes[nLetter].innerHTML = input[nLetter];
        if (nLetter == wordSize - 1) checkRow();
        else nLetter++;
    }
}

function removeLetter()
{
    if (nLetter > 0)
    {
        nLetter--;
        input[nLetter] = "";
        rows[nRow].childNodes[nLetter].innerHTML = "";
    }
}

function generateWord()
{
    return "TABLEAU";
}

function generateGame()
{
    while (game.firstChild) game.removeChild(game.firstChild);
    for (let i = 0; i < maxTries; i++)
    {
        let row = document.createElement("div");
        row.classList.add("row");
        rows.push(row);
        game.appendChild(row);
        for (let j = 0; j < wordSize; j++)
        {
            let c = document.createElement("div");
            c.classList.add("cell");
            row.appendChild(c);
        }
    }
}

function generateKeyboard()
{
    const keys = keyboard.querySelectorAll("td");
    if (!!keys)
        keys.forEach(key => {
            if (key.childElementCount === 0)
                key.onclick = (e) => addLetter(key.innerHTML);
            else if (key.id === "delete")
                key.onclick = (e) => removeLetter();
            else if (key.id === "enter")
                key.onclick = (e) => checkRow();
        });
}

const letterRegex = /[a-z]/i;

document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey) return;
    if (active)
    {
        if(e.key.length === 1 && e.key.match(letterRegex)) addLetter(e.key);
        else if(e.key === "Backspace") removeLetter();
        else if(e.key === "Enter") checkRow();
    }
    else if (e.key === "Enter") restart();
});

function play(gameId, keyboardId, popupId)
{
    game = document.getElementById(gameId);
    keyboard = document.getElementById(keyboardId);
    popup = document.getElementById(popupId);
    if (!!game && !!keyboard && !!popup)
    {
        word = generateWord().toLowerCase();
        wordSize = word.length;
        input = "";
        rows = [];
        nRow = 0;
        nLetter = 0;

        generateGame();
        active = true;

        generateKeyboard();
    }
}

function finish(victory)
{
    active = false;
    popup.querySelector("#message").innerHTML = victory ? "Gagné !" : "Perdu...";
    popup.querySelector("#mot>b").innerHTML = word.toUpperCase();
    popup.classList.add("active");
    popup.onclick = () => restart();
}

function restart()
{
    popup.classList.remove("active");
    play(game.id, keyboard.id, popup.id);
}