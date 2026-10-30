import {DisplayCards, DisplayOnPage, CardHTML} from "./modules/DisplayCard.js";

window.onload = Init;

function Init()
{
    let canvas = document.getElementById("GameCanvas");
    let context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    canvas.addEventListener("mousedown", function(e) {GetMousePosition(canvas, e)});

    AddEnemyCharacters();
    InitialDisplay();
}

function InitialDisplay()
{
    DisplayCards(GetInactiveCharacters(JSON.parse(sessionStorage.enemyCharacters), JSON.parse(sessionStorage.enemyActiveChar)), "", "TopCards", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.activeChar)), "playerActive", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.enemyActiveChar)), "enemyActive", 0.7);
    DisplayCards(GetInactiveCharacters(JSON.parse(sessionStorage.Characters), JSON.parse(sessionStorage.activeChar)), "", "BottomCards", 0.7);
}

function AddEnemyCharacters()
{
    let rngCharacters = GetRandom(JSON.parse(localStorage.Characters), 3);
    sessionStorage["enemyCharacters"] = JSON.stringify(rngCharacters);
    sessionStorage["enemyActiveChar"] = JSON.stringify(rngCharacters[Math.floor(Math.random() * rngCharacters.length)]);
}

function GetInactiveCharacters(total, active)
{
    const index = total.indexOf(active);
    console.log(index);
    if (index == -1) total.splice(index, 1);

    return total;
}

function GetRandom(arr, n)
{
    let rngArray = [];
    for (let i = 0; i < n; i++)
    {
        let randomElement = arr[Math.floor(Math.random() * (arr.length))]
        console.log(arr);
        console.log(randomElement);
        rngArray.push(randomElement);
        console.log(arr);
        console.log(rngArray);
        //arr = arr.filter(element => {element != randomElement});
    }

    return rngArray;
}

function GetMousePosition(canvas, event)
{
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.right;
    console.log(x, y);
    return {x: x, y: y};
}