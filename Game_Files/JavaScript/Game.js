import { DisplayCards, DisplayOnPage, CardHTML } from "./modules/DisplayCard.js";
import { Rectangle, Img, Position } from "./modules/CanvasDisplay.js";
import { ElementType } from "./modules/GameData.js";

window.onload = Init;
const TYPESSOURCE = "../Sprites/Types/";
function Init()
{
    let canvas = document.getElementById("GameCanvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    canvas.addEventListener("mousedown", function(e) {GetMousePosition(canvas, e)});

    InitialDisplay(canvas);
}

function InitialDisplay(canvas)
{
    DisplayAllCards();
    DisplayAtkInfo(canvas);
    DisplayEnergies(canvas);
}

function DisplayEnergies(canvas)
{
    const IMGWIDTH = 40; const IMGHEIGHT = 40;
    const playerEnergiesImgs = GetEnergies(JSON.parse(sessionStorage.Energy));
    const enemyEnergiesImgs = GetEnergies(JSON.parse(sessionStorage.enemyEnergies));
    
    const playerTypePositions = [
        new Position(165, 185),
        new Position(110, 230),
        new Position(130, 300),
        new Position(200, 300),
        new Position(220, 230),
    ];

    const enemyTypePositions = [
        new Position(1275, 525),
        new Position(1220, 570),
        new Position(1240, 640),
        new Position(1310, 640),
        new Position(1330, 570),
    ];

    DisplayImages(canvas, playerEnergiesImgs, playerTypePositions, IMGWIDTH, IMGHEIGHT);
    DisplayImages(canvas, enemyEnergiesImgs, enemyTypePositions, IMGWIDTH, IMGHEIGHT);
}

function DisplayImages(canvas, imgs, positions, width, height)
{
    for (let i = 0; i < imgs.length; i++) imgs[i].DrawImage(canvas, positions[i].x, positions[i].y, width, height);
}

/**
 * Takes array of energies and returns array of Img
 * @param {Array[ElementType]} energiesArr 
 * @returns {Array[Img]}
 */
function GetEnergies(energiesArr)
{
    let imgsArr = []; //Array[Img]
    console.log(typeof energiesArr);
    for(let i = 0; i < energiesArr.length; i++) imgsArr.push(new Img(TYPESSOURCE + energiesArr[i] + ".png"));

    return imgsArr;
}

function DisplayAtkInfo(canvas)
{
    DrawAtkInfoContainer(canvas);
    
}

function DrawAtkInfoContainer(canvas)
{
    const playerAtkInfoContainer = new Rectangle(75, 420, 270, 270, "rgba(255, 255, 255, 0.5)");
    const enemyAtkInfoContainer = new Rectangle(1100, 150, 270, 270, "rgba(255, 255, 255, 0.5)");
    
    playerAtkInfoContainer.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
    enemyAtkInfoContainer.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
}

function DisplayAllCards()
{
    DisplayCards(GetInactiveCharacters(JSON.parse(sessionStorage.enemyCharacters), JSON.parse(sessionStorage.enemyActiveChar)), "", "TopCards", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.activeChar)), "playerActive", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.enemyActiveChar)), "enemyActive", 0.7);
    DisplayCards(GetInactiveCharacters(JSON.parse(sessionStorage.Characters), JSON.parse(sessionStorage.activeChar)), "", "BottomCards", 0.7);
}

function GetInactiveCharacters(total, active)
{
    const index = total.indexOf(active);
    console.log(index);
    if (index == -1) total.splice(index, 1);

    return total;
}

function GetMousePosition(canvas, event)
{
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.right;
    console.log(x, y);
    return {x: x, y: y};
}