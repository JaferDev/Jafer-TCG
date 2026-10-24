import {DisplayCards} from "./modules/DisplayCard.js"

window.onload = Init;

function Init()
{
    let characters = JSON.parse(sessionStorage.Characters);
    let onClicks = ["SelectCharacter(0)", "SelectCharacter(1)"];
    DisplayCards(characters, onClicks);
}