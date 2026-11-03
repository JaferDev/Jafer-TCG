import { DisplayCards, DisplayOnPage, CardHTML } from "./modules/DisplayCard.js";
import { Rectangle, Img, CanvasElement, Text, ClearPortion } from "./modules/CanvasDisplay.js";
import { FindWeakness, FindReactions } from "./modules/GameData.js";

window.onload = Init;

const TYPESSOURCE = "../Sprites/Types/";
let canvasElements = []; //Array[Interactable]
let confirmingAtk = false;

function Init()
{
    let canvas = document.getElementById("GameCanvas");

    canvas.width = 1450;
    canvas.height = 830;
    
    canvas.addEventListener("click", function(e) {CheckClicked(e, canvas)}, false);

    InitialDisplay(canvas);
}

function InitialDisplay(canvas)
{
    TransparentButton(canvas);
    DisplayAllCards();
    DisplayAtkInfo(canvas);
    DisplayEnergies(canvas);
    DisplayInfoBox(canvas, "Select an attack by clicking on it. The attack you choose will consume the energy(s) shown beside the attack. You are on the bottom side (cards facing up)");
}

function TransparentButton(canvas)
{
    const homeBtn = new Rectangle(470, 10, 155, 35, "rgba(255, 255, 255, 0)", () => {location.replace("../index.html");});
    const highscoresBtn = new Rectangle(715, 10, 295, 35, "rgba(255, 255, 255, 0)", () => {location.replace("6_highscores.html");});
    canvasElements.push(homeBtn, highscoresBtn);
    homeBtn.DrawRectangle(canvas);
    highscoresBtn.DrawRectangle(canvas);
}

function DisplayEnergies(canvas)
{
    const IMGWIDTH = 40; const IMGHEIGHT = 40;
    const STARTX1 = 165; const STARTY1 = 185;
    const STARTX2 = 1275; const STARTY2 = 525;
    const playerEnergiesImgs = GetEnergies(JSON.parse(sessionStorage.Energy));
    const enemyEnergiesImgs = GetEnergies(JSON.parse(sessionStorage.enemyEnergies));
    
    const playerTypePositions = [
        new CanvasElement(STARTX1, STARTY1),
        new CanvasElement(STARTX1 - 55, STARTY1 + 45),
        new CanvasElement(STARTX1 - 35, STARTY1 + 115),
        new CanvasElement(STARTX1 + 35, STARTY1 + 115),
        new CanvasElement(STARTX1 + 55, STARTY1 + 45),
    ];

    const enemyTypePositions = [
        new CanvasElement(STARTX2, STARTY2),
        new CanvasElement(STARTX2 - 55, STARTY2 + 45),
        new CanvasElement(STARTX2 - 35, STARTY2 + 115),
        new CanvasElement(STARTX2 + 35, STARTY2 + 115),
        new CanvasElement(STARTX2 + 55, STARTY2 + 45),
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
    const TYPEWIDTH = 30; const TYPEHEIGHT = 30;
    
    AtkInfo(canvas, TYPEWIDTH, TYPEHEIGHT, JSON.parse(sessionStorage.activeChar), 80, 440);
    AtkInfo(canvas, TYPEWIDTH, TYPEHEIGHT, JSON.parse(sessionStorage.enemyActiveChar), 1105, 170);
}
function AtkInfo(canvas, typesWidth, typesHeight, activeChar, STARTX, STARTY)
{
    //Creating
    //WeakAtk
    const backgroundRectangle1 = new Rectangle(STARTX, STARTY, 260, 110, "rgba(0, 0, 0, 0.2)", () => {SelectAtk(canvas, activeChar.weakAttack);});
    const weakPos = new CanvasElement(STARTX + 5, STARTY + 10);
    const weakType = new Img(TYPESSOURCE + activeChar.weakAttack.types[0] + ".png")
    const weakAtkHeader = new Text(STARTX + 60, STARTY + 40, activeChar.weakAttack.name, "anta", 25);
    const weakDmg = new Text(STARTX + 215, STARTY + 40, activeChar.weakAttack.dmg, "anta", 30);

    //StrongAtk
    const backgroundRectangle2 = new Rectangle(STARTX, STARTY + 130, 260, 110, "rgba(0, 0, 0, 0.2)",() => {SelectAtk(canvas, activeChar.strongAttack);});
    const strongType1 = new Img(TYPESSOURCE + activeChar.strongAttack.types[0] + ".png")
    const strongType2 = new Img(TYPESSOURCE + activeChar.strongAttack.types[1] + ".png")
    const strongType3 = new Img(TYPESSOURCE + activeChar.strongAttack.types[2] + ".png")
    const strongAtkHeader = new Text(STARTX + 80, STARTY + 170, activeChar.strongAttack.name, "anta", 25);
    const strongDmg = new Text(STARTX + 215, STARTY + 170, activeChar.strongAttack.dmg, "anta", 30);
    canvasElements.push(backgroundRectangle1, backgroundRectangle2);
 
    const strongPositions = [
        new CanvasElement(STARTX + 5, STARTY + 145),
        new CanvasElement(STARTX + 25, STARTY + 145),
        new CanvasElement(STARTX + 45, STARTY + 145),
    ];

    //Displaying

    //WeakAtk
    backgroundRectangle1.DrawRectangle(canvas);
    DisplayImages(canvas, [weakType], [weakPos], typesWidth, typesHeight);
    weakAtkHeader.Write(canvas);
    weakDmg.Write(canvas);
    DisplayMultipleLines(canvas, activeChar.weakAttack.desc, 40, STARTX + 10, STARTY + 85, 17, "silkscreenRegular", "rgb(0, 0, 0)") 

    //StrongAtk
    backgroundRectangle2.DrawRectangle(canvas);
    DisplayImages(canvas, [strongType1, strongType2, strongType3], strongPositions, typesWidth, typesHeight);
    strongAtkHeader.Write(canvas);
    strongDmg.Write(canvas);
    DisplayMultipleLines(canvas, activeChar.strongAttack.desc, 40, STARTX + 10, STARTY + 210, 17, "silkscreenRegular", "rgb(0, 0, 0)") 
}

function DrawAtkInfoContainer(canvas)
{
    const playerAtkInfoContainer = new Rectangle(75, 420, 270, 270, "rgba(255, 255, 255, 0.5)");
    const enemyAtkInfoContainer = new Rectangle(1100, 150, 270, 270, "rgba(255, 255, 255, 0.5)");
    canvasElements.push(playerAtkInfoContainer, enemyAtkInfoContainer);

    playerAtkInfoContainer.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
    enemyAtkInfoContainer.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
}

function DisplayAllCards()
{
    DisplayCards(GetInactiveCharacters(JSON.parse(sessionStorage.enemyCharacters), JSON.parse(sessionStorage.enemyActiveChar)), "", "TopCards", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.activeChar), "", "playerChar"), "playerActive", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.enemyActiveChar), "", "enemyChar"), "enemyActive", 0.7);
    DisplayCards(GetInactiveCharacters(JSON.parse(sessionStorage.Characters), JSON.parse(sessionStorage.activeChar)), "", "BottomCards", 0.7);
}

function GetInactiveCharacters(total, active)
{
    const index = total.indexOf(active);
    if (index == -1) total.splice(index, 1);

    return total;
}

function DisplayInfoBox(canvas, text, STARTX = 80, STARTY = 710)
{
    //Creating Objects
    ClearPortion(canvas, STARTX, STARTY, 400, 100);
    const infoBg = new Rectangle(STARTX, STARTY, 400, 100, "rgba(255, 255, 255, 0.45)");
    const reminderBg = new Rectangle(10, 10, 390, 30, "rgba(0, 0, 0, 1)")
    const reminderTxt = new Text(20, 30, "REMINDER: Kindly play the entire game in full screen (F11)", "anta", 15, "rgb(255, 255, 255)");
    canvasElements.push(infoBg);

    infoBg.DrawRectangle(canvas, true, "rgba(0, 0, 0, 1)", 5); 
    reminderBg.DrawRectangle(canvas, true, "rgb(0, 0, 0, 1)", 5);
    reminderTxt.Write(canvas);
    DisplayMultipleLines(canvas, text, 45, STARTX + 15, STARTY + 25, 15, "silkscreenRegular", "rgb(64, 255, 0)");
}

function MultiLineText(text, lineLength)
{
    let words = text.toString().split(" ");
    let lines = [];
    let curLine = "";
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

function CheckClicked(event, canvas)
{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(x, y);
    canvasElements.forEach(element => {
        if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) 
        {
            console.log(element.functionality);
            console.log(element.x, element.y);
            if (element.functionality) element.functionality();
        }
    });
}

function SelectAtk(canvas, atk)
{
    if (confirmingAtk) { DisplayInfoBox(canvas, `Confirmed ${atk.name}`); Attack(atk);} 
    else {DisplayInfoBox(canvas, `Confirm ${atk.name}? (Click again)`); confirmingAtk = true;}
}

function Attack (atk)
{
    let enemyActive = JSON.parse(sessionStorage.enemyActiveChar);

    enemyActive.hp -= GetDmg(atk, enemyActive);
    sessionStorage.enemyActiveChar = JSON.stringify(enemyActive);
    DisplayAllCards();
}

function GetDmg(atk, enemy)
{
    let totalDmg = atk.dmg;
    let enemyWeaknesses = [];
    enemy.types.forEach(type => { enemyWeaknesses.push(FindWeakness(type)); });
    console.log(enemyWeaknesses);x
    if (CheckAnyInArray(atk.types, enemyWeaknesses)) totalDmg *= 1.1;
    if (enemy.elementApplied === null) return totalDmg;

    if (CheckAnyInArray(FindReactions(enemy.elementApplied), atk.types)) return totalDmg *= 1.1; 
    
    return totalDmg;
}

function CheckAnyInArray(targetArr, arrToCheck)
{
    for (let i = 0; i < arrToCheck.length; i++)
    {
        if (arrToCheck.includes(targetArr[i])) return true;
    }
    return false;
}