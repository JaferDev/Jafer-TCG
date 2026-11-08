import {DisplayCards} from "./modules/DisplayCard.js"
import { Sound } from "./modules/GameData.js";
const ENERGYPAGE = "4_pickenergy.html";

let charsSelected = [];

const MAXCHARSSELECT = 3;

window.onload = Init;
window.SelectCharacter = SelectCharacter;
window.ConfirmCharacterSelection = ConfirmCharacterSelection;
let cardAudio;
function Init()
{
    cardAudio = new Sound("../Audio/TakeCard.mp3", 0.5);
    let characters = JSON.parse(localStorage.Characters);
    let onClicks = ["SelectCharacter(1)", "SelectCharacter(2)", "SelectCharacter(3)", "SelectCharacter(4)", "SelectCharacter(5)", "SelectCharacter(6)", "SelectCharacter(7)", "SelectCharacter(8)", "SelectCharacter(10)", "SelectCharacter(11)", "SelectCharacter(12)"]
    DisplayCards(characters, onClicks, "CardContainer");

    let username;
    if (JSON.parse(sessionStorage.loggedIn)) username = "LOGOUT";
    else username = "LOGIN"
    document.getElementById("Logout").innerHTML = username;
}

function SelectCharacter(charIndex)
{
    cardAudio.Play();
    if (charsSelected.includes(charIndex)) DeselectCharacter(charIndex);
    else if (charsSelected.length != MAXCHARSSELECT) charsSelected.push(charIndex);
    DisplaySelection()
}   

/**
 * Displays selection of selected characters
 */
function DisplaySelection()
{   
    let characters = JSON.parse(localStorage.Characters);
    let namesCharsSelected = [];

    charsSelected.forEach(charIndex => {
        namesCharsSelected.push(characters[charIndex - 1].name);
    });

    document.getElementById("SelectionDisplay").innerHTML = "Characters Selected: " + namesCharsSelected;
}

function DeselectCharacter(charIndex)
{
    charsSelected = charsSelected.filter(item => item != charIndex);
}

/**
 * If 3 characters selected, push to sessionStorage.Characters and go select energy
 */
function ConfirmCharacterSelection()
{
    if (charsSelected.length != MAXCHARSSELECT)  return;
    
    let charObjs = [];
    let characters = JSON.parse(localStorage.Characters);
    charsSelected.forEach(charIndex => {
        charObjs.push(characters[charIndex - 1]);
    });
    sessionStorage.Characters = JSON.stringify(charObjs);

    location.replace(ENERGYPAGE);
}
