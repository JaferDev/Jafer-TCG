import {DisplayCards} from "./modules/DisplayCard.js";

window.onload = Init;

function Init()
{
    InitialDisplay();
    const FPS = 60;

    let topCard = document.getElementById("TopCards");
    topCard.addEventListener("click", function(){setInterval(Animate, 1000 / FPS)})
}

function InitialDisplay()
{
    let topCards = document.getElementById("TopCards");
    DisplayCards(JSON.parse(sessionStorage.Characters), "", "TopCards", 0.7);
}