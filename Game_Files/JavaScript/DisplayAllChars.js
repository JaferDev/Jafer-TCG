import {DisplayCards} from "./modules/DisplayCard.js"

window.onload = Init;

function Init()
{
    let characters = JSON.parse(localStorage.Characters);
    let onClicks = ["SelectCharacter(1)", "SelectCharacter(2)", "SelectCharacter(3)", "SelectCharacter(4)", "SelectCharacter(5)", "SelectCharacter(6)", "SelectCharacter(7)", "SelectCharacter(8)", "SelectCharacter(10)", "SelectCharacter(11)", "SelectCharacter(12)"]
    DisplayCards(characters, onClicks);
}