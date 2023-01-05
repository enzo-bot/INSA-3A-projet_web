import * as api from "./api.js"
import * as wordle from "./wordle.js";

// ID du formulaire de configuration.
export const id = "wordle-config";

// ID du champ des dictionnaires.
export const dicoId = "dico";
// ID du champ des dictionnaires.
export const maxLengthId = "maxLength";
// ID du boutton START.
export const startId = "start";

// Élément HTML du formulaire.
const form = document.getElementById(id);
// Élément HTML du champ des dictionnaires.
const dicoField = document.getElementById(dicoId);
// Élément HTML du champ de la taille maximale des mots.
const maxLengthField = document.getElementById(maxLengthId);
// Élément HTML du boutton start.
const startButton = document.getElementById(startId);

export var isSelected = false;

var dico = dicoField.childNodes[dicoField.selectedIndex + 1].value;
var maxLength = maxLengthField.value;

const setSelectionEvents = (element) => {
    element.onfocus   = () => { isSelected = true; };
    element.onblur    = () => { isSelected = false; };
}

export const init = () => {
    api.updateDicos().then(
        () => {
            // Contenu du formulaire.
            api.dicos.forEach(dico => {
                const option = document.createElement("option");
                option.value = dico;
                option.innerText = dico;
                if (dico === api.currentDico) option.selected = true;
                dicoField.appendChild(option);
            });
            // Sélection du formulaire.
            setSelectionEvents(dicoField);
            setSelectionEvents(maxLengthField);
            setSelectionEvents(startButton);
            // Actions du formulaire.
            dicoField.onchange = () => dico = dicoField.childNodes[dicoField.selectedIndex + 1].value;
            maxLengthField.value = api.currentMaxLength;
            maxLengthField.onchange = () => maxLength = maxLengthField.value;
            startButton.onclick = () => {
                api.setDico(dico);
                api.setMaxLength(maxLength);
                wordle.restart();
            };
        },
        err => console.error(err)
    );
};