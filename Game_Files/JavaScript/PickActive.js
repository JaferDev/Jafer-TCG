import {DisplayCards} from "./modules/DisplayCard.js"

const ENERGYPAGE = "4_pickenergy.html";

let activeChar;

window.onload = Init;
window.SelectCharacter = SelectCharacter;
window.ConfirmCharacterSelection = ConfirmCharacterSelection;

function Init()
{
    let characters = JSON.parse(sessionStorage.Characters);
    let onClicks = ["SelectCharacter(0)", "SelectCharacter(1)", "SelectCharacter(2)"];
    DisplayCards(characters, onClicks, "CardContainer");
}

function SelectCharacter(charIndex)
{
    if (activeChar == charIndex) activeChar = undefined;
    else activeChar = charIndex;
    console.log(activeChar);
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
    sessionStorage.activeChar = JSON.stringify(characters[activeChar]);

    location.replace(ENERGYPAGE);
}
