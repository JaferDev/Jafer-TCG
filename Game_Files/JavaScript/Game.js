import { DisplayCards, DisplayOnPage, CardHTML } from "./modules/DisplayCard.js";
import { Rectangle, Img, Position, Text } from "./modules/CanvasDisplay.js";
import { ElementType, Character } from "./modules/GameData.js";

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
    DisplayInfoBox(canvas, 80, 710);
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
    for(let i = 0; i < energiesArr.length; i++) imgsArr.push(new Img(TYPESSOURCE + energiesArr[i] + ".png"));

    return imgsArr;
}

function DisplayAtkInfo(canvas)
{
    DrawAtkInfoContainer(canvas);
    const TYPEWIDTH = 35; const TYPEHEIGHT = 35;
    
    AtkInfo(canvas, TYPEWIDTH, TYPEHEIGHT, JSON.parse(sessionStorage.activeChar), 80, 440);
    AtkInfo(canvas, TYPEWIDTH, TYPEHEIGHT, JSON.parse(sessionStorage.enemyActiveChar), 1105, 170);
}
function AtkInfo(canvas, typesWidth, typesHeight, activeChar, STARTX, STARTY)
{
    //Creating
    //WeakAtk
    const backgroundRectangle1 = new Rectangle(STARTX, STARTY, 260, 110, "rgba(0, 0, 0, 0.2)");
    const weakPos = new Position(STARTX + 5, STARTY + 10);
    const weakType = new Img(TYPESSOURCE + activeChar.weakAttack.types[0] + ".png")
    const weakAtkHeader = new Text(STARTX + 60, STARTY + 40, activeChar.weakAttack.name, "anta", 30);
    const weakDmg = new Text(STARTX + 215, STARTY + 40, activeChar.weakAttack.dmg, "anta", 30);
    
    //StrongAtk
    const backgroundRectangle2 = new Rectangle(STARTX, STARTY + 130, 260, 110, "rgba(0, 0, 0, 0.2)");
    const strongPos = new Position(STARTX + 5, STARTY + 140);
    const strongType = new Img(TYPESSOURCE + activeChar.strongAttack.types[0] + ".png")
    const strongAtkHeader = new Text(STARTX + 60, STARTY + 170, activeChar.strongAttack.name, "anta", 30);
    const strongDmg = new Text(STARTX + 215, STARTY + 170, activeChar.strongAttack.dmg, "anta", 30);

    //Displaying

    //WeakAtk
    backgroundRectangle1.DrawRectangle(canvas);
    DisplayImages(canvas, [weakType], [weakPos], typesWidth, typesHeight);
    weakAtkHeader.Write(canvas);
    weakDmg.Write(canvas);
    DisplayMultipleLines(canvas, activeChar.weakAttack.desc, 40, STARTX + 10, STARTY + 80, 17, "silkscreenRegular", "rgb(0, 0, 0)") 

    //StrongAtk
    backgroundRectangle2.DrawRectangle(canvas);
    DisplayImages(canvas, [strongType], [strongPos], typesWidth, typesHeight);
    strongAtkHeader.Write(canvas);
    strongDmg.Write(canvas);
    DisplayMultipleLines(canvas, activeChar.strongAttack.desc, 40, STARTX + 10, STARTY + 210, 17, "silkscreenRegular", "rgb(0, 0, 0)") 
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
    if (index == -1) total.splice(index, 1);

    return total;
}

function GetMousePosition(canvas, event)
{
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.right;

    return {x: x, y: y};
}

function DisplayInfoBox(canvas, STARTX, STARTY)
{
    //Creating Objects
    const infoBg = new Rectangle(STARTX, STARTY, 400, 100, "rgba(255, 255, 255, 0.45)");
    const infoTxt = new Text(STARTX + 15, STARTY + 25, "Select an attack by clicking on it.", "silkscreenRegular", 20, "rgb(64, 255, 0)");
    const infoTxt2 = new Text(STARTX + 15, STARTY + 45, "The attack you choose will consume the energy(s) shown beside", 20, "rgb(64, 255, 0)");

    infoBg.DrawRectangle(canvas, true, "rgba(0, 0, 0, 1)", 5); 
    DisplayMultipleLines(canvas, "Select an attack by clicking on it. The attack you choose will consume the energy(s) shown beside the attack", 50, STARTX + 15, STARTY + 25, 20, "silkscreenRegular", "rgb(64, 255, 0)");
}

function MultiLineText(text, lineLength)
{
    let words = text.toString().split(" ");
    let lines = [];
    let curLine = "";
    console.log(words);
    for(let i = 0; i < words.length; i++)
    {
        if (curLine.length + words[i].length + 1 <  lineLength) curLine += words[i] + " ";
        else { lines.push(curLine); curLine = words[i] + " "; }
    }
    lines.push(curLine);

    return lines;
}

function DisplayMultipleLines(canvas, text, lineLength, STARTX, STARTY, fontSize, font, colour)
{
    let lines = MultiLineText(text, lineLength);

    for(let i = 0; i < lines.length; i++) new Text(STARTX, STARTY + fontSize * i, lines[i], font, fontSize, colour).Write(canvas);
}