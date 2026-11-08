import {DisplayCards} from "./modules/DisplayCard.js"
import { Sound } from "./modules/GameData.js";
const GAMEPAGE = "5_game.html";

let activeChar;

window.onload = Init;
window.SelectCharacter = SelectCharacter;
window.ConfirmCharacterSelection = ConfirmCharacterSelection;
let pickSound;
function Init()
{
    pickSound = new Sound("../Audio/TakeCard.mp3", 0.5);
    DisplayLoggedIn();
    let characters = JSON.parse(sessionStorage.Characters);
    characters = GetAliveChars(characters);
    let onClicks = ["SelectCharacter(0)", "SelectCharacter(1)", "SelectCharacter(2)"];
    DisplayCards(characters, onClicks, "CardContainer");
}

function DisplayLoggedIn()
{
    let loggedIn;
    if (JSON.parse(sessionStorage.loggedIn)) loggedIn = "Logout";
    else loggedIn = "Login";

    document.getElementById("Logout").innerHTML = loggedIn;
}

function GetAliveChars(characters)
{
    let aliveCharacters = [];
    characters.forEach(character => {if (character.hp != 0) aliveCharacters.push(character);});
    return aliveCharacters;
}

function SelectCharacter(charIndex)
{
    pickSound.Play();
    if (activeChar == charIndex) activeChar = undefined;
    else activeChar = charIndex;
    DisplaySelection();
}   

function DisplaySelection()
{   
    if (activeChar == undefined) 
    {
        document.getElementById("SelectionDisplay").innerHTML = "Active Character: ";
        return;
    }

    let characters = JSON.parse(sessionStorage.Characters);
    document.getElementById("SelectionDisplay").innerHTML = "Active Character: " + characters[activeChar].name;
}

function ConfirmCharacterSelection()
{
    if (activeChar == undefined) return;
    
    let characters = JSON.parse(sessionStorage.Characters);
    characters = GetAliveChars(characters);
    sessionStorage.activeChar = JSON.stringify(characters[activeChar]);

    location.replace(GAMEPAGE);
}