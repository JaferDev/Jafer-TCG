import {DisplayCards} from "./modules/DisplayCard.js"

const GAMEPAGE = "3_selectactive.html";

let charsSelected = [];

const MAXCHARSSELECT = 3;

window.onload = Init;
window.SelectCharacter = SelectCharacter;
window.ConfirmCharacterSelection = ConfirmCharacterSelection;

function Init()
{
    let characters = JSON.parse(localStorage.Characters);
    let onClicks = ["SelectCharacter(1)", "SelectCharacter(2)", "SelectCharacter(3)", "SelectCharacter(4)", "SelectCharacter(5)", "SelectCharacter(6)", "SelectCharacter(7)", "SelectCharacter(8)", "SelectCharacter(10)", "SelectCharacter(11)", "SelectCharacter(12)"]
    DisplayCards(characters, onClicks, "CardContainer");

    let username;
    if (JSON.parse(sessionStorage.loggedIn)) username = JSON.parse(sessionStorage.username);
    else username = "LOGIN"
    document.getElementById("Navbar").innerHTML = `<button class=\"TopButton\" onclick=\"ChangePage(0)\">${username}</button>` + document.getElementById("Navbar").innerHTML;
}

function SelectCharacter(charIndex)
{
    console.log("-----------\n", charsSelected);
    if (charsSelected.includes(charIndex)) DeselectCharacter(charIndex);
    else if (charsSelected.length != MAXCHARSSELECT) charsSelected.push(charIndex);
    DisplaySelection()
}   

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

function ConfirmCharacterSelection()
{
    if (charsSelected.length != MAXCHARSSELECT) {console.log("Nop"); return;}
    
    let charObjs = [];
    let characters = JSON.parse(localStorage.Characters);
    charsSelected.forEach(charIndex => {
        charObjs.push(characters[charIndex - 1]);
    });
    sessionStorage.Characters = JSON.stringify(charObjs);

    location.replace(GAMEPAGE);
}
