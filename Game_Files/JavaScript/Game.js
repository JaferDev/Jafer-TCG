import { DisplayCards, DisplayOnPage, CardHTML } from "./modules/DisplayCard.js";
import { Rectangle, Img, CanvasElement, Text, ClearPortion } from "./modules/CanvasDisplay.js";
import { FindWeakness, FindReactions, ElementType } from "./modules/GameData.js";

window.onload = Init;

const TYPESSOURCE = "../Sprites/Types/";
let canvasElements = []; //Array[Interactable]
let confirmingWeakAtk = false;
let confirmingStrongAtk = false;
let playerTurn = true;
let selectingEnergy = false;
let selectedEnergy = false;

function Init()
{
    let canvas = document.getElementById("GameCanvas");

    canvas.width = 1478;
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

    let gameText;
    if (JSON.parse(sessionStorage.loggedIn)) gameText = JSON.parse(sessionStorage.username) + "'s turn";
    else gameText = JSON.parse(sessionStorage.guestName) + "'s turn";
    DisplayInfoBox(canvas, "Select an attack by clicking on it. The attack you choose will consume the energy(s) shown beside the attack. You are on the bottom side (cards facing up)", gameText);
}

function TransparentButton(canvas)
{
    const homeBtn = new Rectangle(470, 10, 155, 35, "rgba(255, 255, 255, 0)", () => {location.replace("../index.html");});
    const highscoresBtn = new Rectangle(715, 10, 295, 35, "rgba(255, 255, 255, 0)", () => {location.replace("6_highscores.html");});
    
    const CHARWIDTH = 145; const CHARHEIGHT = 200;
    const char1 = new Rectangle(540, 350, CHARWIDTH, CHARHEIGHT, "rgba(0, 0, 0, 0)", () => {AttemptSwitching(canvas, 1);});
    const char2 = new Rectangle(580, 580, CHARWIDTH, CHARHEIGHT, "rgba(0, 0, 0, 0)", () => {AttemptSwitching(canvas, 2);});
    const char3 = new Rectangle(755, 580, CHARWIDTH, CHARHEIGHT, "rgba(0, 0, 0, 0)", () => {AttemptSwitching(canvas, 3);});
    
    canvasElements.push(homeBtn, highscoresBtn, char1, char2, char3);
    homeBtn.DrawRectangle(canvas);
    highscoresBtn.DrawRectangle(canvas);
    char1.DrawRectangle(canvas);
    char2.DrawRectangle(canvas);
    char3.DrawRectangle(canvas);
}

function DisplayEnergies(canvas)
{
    const IMGWIDTH = 40; const IMGHEIGHT = 40;
    const STARTX1 = 165; const STARTY1 = 185;
    const STARTX2 = 1275; const STARTY2 = 525;
    
    ClearPortion(canvas, STARTX1 - 60, STARTY1 - 80, 180, 260);
    ClearPortion(canvas, STARTX2 - 60, STARTY2 - 80, 180, 260);

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
    
    const playerEnergiesImgs = GetEnergies(JSON.parse(sessionStorage.Energy), playerTypePositions, IMGWIDTH, IMGHEIGHT, GetFunctions(canvas, JSON.parse(sessionStorage.Energy)));
    const enemyEnergiesImgs = GetEnergies(JSON.parse(sessionStorage.enemyEnergies), enemyTypePositions, IMGWIDTH, IMGHEIGHT, GetFunctions(canvas, JSON.parse(sessionStorage.enemyEnergies)));
    
    DisplayImages(canvas, playerEnergiesImgs);
    DisplayImages(canvas, enemyEnergiesImgs);
}

function GetFunctions(canvas, energies)
{
    let functions = [];
    for(let i = 0; i < energies.length; i++)
    {
        functions.push( () => {SelectEnergy(canvas, energies[i]);} );
    }
    return functions;
}

function DisplayImages(canvas, imgs)
{
    for (let i = 0; i < imgs.length; i++)  {imgs[i].DrawImage(canvas);canvasElements.push(imgs[i]);}
}

/**
 * Takes array of energies and returns array of Img
 * @param {Array[ElementType]} energiesArr 
 * @returns {Array[Img]}
 */
function GetEnergies(energiesArr, positions, width, height, functions)
{
    let imgsArr = []; //Array[Img]
    for(let i = 0; i < energiesArr.length; i++) 
    {
        imgsArr.push(new Img(TYPESSOURCE + energiesArr[i] + ".png", positions[i].x, positions[i].y, width, height, functions[i]));
    }
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
    const backgroundRectangle1 = new Rectangle(STARTX, STARTY, 260, 110, "rgba(0, 0, 0, 0.2)", () => {SelectAtk(canvas, activeChar.weakAttack, 0);});

    const weakType = new Img(TYPESSOURCE + activeChar.weakAttack.types[0] + ".png", STARTX + 5, STARTY + 10, typesWidth, typesHeight);
    const weakAtkHeader = new Text(STARTX + 60, STARTY + 40, activeChar.weakAttack.name, "silkscreenRegular", 20);
    const weakDmg = new Text(STARTX + 230, STARTY + 40, activeChar.weakAttack.dmg, "silkscreenRegular", 20);

    //StrongAtk
    const backgroundRectangle2 = new Rectangle(STARTX, STARTY + 130, 260, 110, "rgba(0, 0, 0, 0.2)",() => {SelectAtk(canvas, activeChar.strongAttack, 1);});
    const strongType1 = new Img(TYPESSOURCE + activeChar.strongAttack.types[0] + ".png", STARTX + 5, STARTY + 145, typesWidth, typesHeight)
    const strongType2 = new Img(TYPESSOURCE + activeChar.strongAttack.types[1] + ".png", STARTX + 25, STARTY + 145, typesWidth, typesHeight)
    const strongType3 = new Img(TYPESSOURCE + activeChar.strongAttack.types[2] + ".png", STARTX + 45, STARTY + 145, typesWidth, typesHeight)
    const strongAtkHeader = new Text(STARTX + 80, STARTY + 170, activeChar.strongAttack.name, "silkscreenRegular", 20);
    const strongDmg = new Text(STARTX + 230, STARTY + 170, activeChar.strongAttack.dmg, "silkscreenRegular", 20);
    canvasElements.push(backgroundRectangle1, backgroundRectangle2);
    
    //Displaying

    //WeakAtk
    backgroundRectangle1.DrawRectangle(canvas);
    DisplayImages(canvas, [weakType]);
    weakAtkHeader.Write(canvas);
    weakDmg.Write(canvas);
    DisplayMultipleLines(canvas, activeChar.weakAttack.desc, 28, STARTX + 10, STARTY + 85, 14, "silkscreenRegular", "rgb(0, 0, 0)") 

    //StrongAtk
    backgroundRectangle2.DrawRectangle(canvas);
    DisplayImages(canvas, [strongType1, strongType2, strongType3]);
    strongAtkHeader.Write(canvas);
    strongDmg.Write(canvas);
    DisplayMultipleLines(canvas, activeChar.strongAttack.desc, 28, STARTX + 10, STARTY + 210, 14, "silkscreenRegular", "rgb(0, 0, 0)") 
}

function DrawAtkInfoContainer(canvas)
{
    ClearPortion(canvas, 75, 420, 270, 270);
    ClearPortion(canvas, 1100, 150, 270, 270);
    const playerAtkInfoContainer = new Rectangle(75, 420, 270, 270, "rgba(255, 255, 255, 0.5)");
    const enemyAtkInfoContainer = new Rectangle(1100, 150, 270, 270, "rgba(255, 255, 255, 0.5)");
    canvasElements.push(playerAtkInfoContainer, enemyAtkInfoContainer);

    playerAtkInfoContainer.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
    enemyAtkInfoContainer.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
}

function DisplayAllCards()
{
    const inactiveCharacters = GetInactiveCharacters();
    console.log(inactiveCharacters);
    DisplayCards(inactiveCharacters[1], "", "TopCards", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.activeChar), "", "playerChar"), "playerActive", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.enemyActiveChar), "", "enemyChar"), "enemyActive", 0.7);
    DisplayCards(inactiveCharacters[0], "", "BottomCards", 0.7);
}

function GetInactiveCharacters()
{
    const playerChars = JSON.parse(sessionStorage.Characters);
    const enemyChars = JSON.parse(sessionStorage.enemyCharacters);
    const playerChar = JSON.parse(sessionStorage.activeChar);
    const enemyChar = JSON.parse(sessionStorage.enemyActiveChar);
    console.log(playerChars, enemyChars, playerChar, enemyChar);
    let inactivePlayerCharacters = []; let inactiveEnemyCharacters = [];
    for(let i = 0; i < playerChars.length; i++) 
    {
        if (playerChars[i].name != playerChar.name) inactivePlayerCharacters.push(playerChars[i]);
    }

    for(let i = 0; i < enemyChars.length; i++) 
    {
        if (enemyChars[i].name != enemyChar.name) inactiveEnemyCharacters.push(enemyChars[i]);
    }

    return [inactivePlayerCharacters, inactiveEnemyCharacters] ;
} 

function DisplayInfoBox(canvas, text, gameText = "", STARTX = 80, STARTY = 710)
{
    //Creating Objects
    ClearPortion(canvas, STARTX, STARTY, 400, 100);
    ClearPortion(canvas, STARTX, STARTY - 650, 400, 100);

    const infoBg = new Rectangle(STARTX, STARTY, 400, 100, "rgba(0,0,0, 0.5)");
    const reminderBg = new Rectangle(10, 10, 420, 30, "rgba(0, 0, 0, 1)")
    const reminderTxt = new Text(20, 30, "REMINDER: Kindly play the entire game in full screen (F11)", "anta", 15, "rgb(255, 255, 255)");
    const gameInfo = new Rectangle(STARTX, STARTY - 650, 400, 75, "rgba(255, 255, 255, 1)");
    const gameInfoTxt = new Text(STARTX + 10, STARTY - 620, gameText, "silkscreenRegular", 20, "rgb(0, 0, 0)");

    infoBg.DrawRectangle(canvas, true, "rgba(0, 0, 0, 1)", 5); 
    reminderBg.DrawRectangle(canvas, true, "rgb(0, 0, 0, 1)", 5);
    reminderTxt.Write(canvas);
    gameInfoTxt.Write(canvas);
    gameInfo.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
    
    DisplayMultipleLines(canvas, text, 39, STARTX + 15, STARTY + 25, 15, "silkscreenRegular", "rgb(64, 255, 0)");
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
    canvasElements.forEach(element => {
        if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) 
        {
            if (element.functionality) element.functionality();
        }
    });
}

function SelectAtk(canvas, atk, atkStrength)
{
    if (!playerTurn) return;
    if (atkStrength == 0) 
    {
        if (confirmingWeakAtk) 
        { 
            Attack(atk, canvas, atkStrength, "enemyActiveChar", "Energy"); 
            confirmingStrongAtk = false
        }
        else 
        {
            DisplayInfoBox(canvas, `Confirm ${atk.name}? (Click again)`); 
            confirmingWeakAtk = true; 
            confirmingStrongAtk = false;
        }
    }
    else 
    {
        if (confirmingStrongAtk) 
        {
            Attack(atk, canvas, atkStrength, "enemyActiveChar", "Energy"); 
            confirmingWeakAtk = false;
        }
        else 
        {
            DisplayInfoBox(canvas, `Confirm ${atk.name}? (Click again)`); 
            confirmingStrongAtk = true; 
            confirmingWeakAtk = false;
        }
    }
}

function Attack(atk, canvas, atkStrength, opponentKey, energiesKey)
{
    if (!playerTurn) return;
    if (!CheckEnoughEnergy(atk,energiesKey)) { console.log(123);DisplayInfoBox(canvas, "Not enough energy to use " + atk.name + ". Do you want to end turn?"); return;}
    
    let opponentActive = JSON.parse(sessionStorage[opponentKey]);

    opponentActive.hp -= GetDmg(atk, opponentActive);
    sessionStorage[opponentKey] = JSON.stringify(opponentActive);
    DisplayEnergies(canvas);
    DisplayAllCards();
    DisplayInfoBox(canvas, "Wait for enemy's turn to get over", "Enemy's turn")
    playerTurn = false; //After attack, its enemy's turn unless they ended turn
    EnemyTurn(canvas);
}

function CheckEnoughEnergy(atk, energyKey)
{
    let energy = JSON.parse(sessionStorage[energyKey]);
    let energiesRemoved = 0;
    //Go through types array based on amt of energy for atk
    for(let i = 0; i < atk.types.length; i++)
    {
        for(let j = 0; j < energy.length; j++)
        {
            if (energy[j] == atk.types[i]) { console.log("Removed: " + energy[j]); energy.splice(j, 1); energiesRemoved++; break;}
        }
    }

    console.log(energy, energiesRemoved);
    
    if (atk.types.length == energiesRemoved)
    {
        sessionStorage[energyKey] = JSON.stringify(energy);
        return true;
    }

    return false;
}

function GetDmg(atk, enemy)
{
    let totalDmg = atk.dmg;
    let enemyWeaknesses = [];
    enemy.types.forEach(type => { enemyWeaknesses.push(FindWeakness(type)); });

    if (CheckAnyInArray(atk.types, enemyWeaknesses)) totalDmg *= 1.1;
    if (enemy.elementApplied === null) return totalDmg;

    if (CheckAnyInArray(FindReactions(enemy.elementApplied), atk.types)) { enemy.elementApplied = atk.types[0]; return totalDmg *= 1.1}; 
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

function AttemptSwitching(canvas, charNum)
{
    if (!playerTurn) return;
    if (JSON.parse(sessionStorage.Energy).length == 0){ DisplayInfoBox(canvas, "You need at least one energy to switch characters. You can end turn by clicking on the button on the left"); return; }
    
    if (selectedEnergy) { selectedEnergy = false; SwitchCharacter(canvas, charNum); }
    selectingEnergy = true;
    DisplayInfoBox(canvas, "You need to use any one energy to switch characters. Select it by clicking on it");
} 

function SelectEnergy(canvas, energy)
{
    if (!selectingEnergy) return;
    selectingEnergy = false;
    let energies = JSON.parse(sessionStorage.Energy);
    for(let i = 0; i < energies.length; i++)
    {
        if (energy == energies[i]) { energies.splice(i, 1); break;}
    }
    sessionStorage.Energy = JSON.stringify(energies)
    DisplayEnergies(canvas);
    DisplayInfoBox(canvas, "Select a character to switch with by clicking on them");
    
    selectedEnergy = true;
}

function SwitchCharacter(canvas, charNum, isEnemy = false)
{
    let activeChar;
 
    if (!isEnemy) activeChar = JSON.parse(sessionStorage.activeChar); 
    else activeChar = JSON.parse(sessionStorage.enemyActiveChar); 
    const inactiveChars = GetInactiveCharacters()[+ isEnemy];

    //inactiveChars[0] = charNum = 2
    activeChar = inactiveChars[charNum - 2];

    if (!isEnemy) sessionStorage.activeChar = JSON.stringify(activeChar); 
    else sessionStorage.enemyActiveChar = JSON.stringify(activeChar);

    DisplayAllCards();
    DisplayAtkInfo(canvas);
    if (!isEnemy)
    {console.log("Player");
        playerTurn = false;
        DisplayInfoBox(canvas, "", "Enemy's Turn");
        EnemyTurn(canvas);
    }
    else 
    {
        playerTurn = true;
        let gameText;
        if (JSON.parse(sessionStorage.loggedIn)) gameText = JSON.parse(sessionStorage.username) + "'s turn";
        else gameText = JSON.parse(sessionStorage.guestName) + "'s turn";
        DisplayInfoBox(canvas, "Select an attack by clicking on it. The attack you choose will consume the energy(s) shown beside the attack. You are on the bottom side (cards facing up)", gameText);
    }    
}

function EnemyTurn(canvas)
{
    if (playerTurn) return;

    /*
        Actions Chances: (Switch, Weak Attack, Strong Attack, End Round)
            Energy > 2:
                Switch: 25%, Weak Attack: 50%, Strong Attack: 20%, End: 5%
            Energy <= 2 && Energy > 0:
                Switch: 50%, Weak Attack 10%, End: 40%
            Energy == 0
                End: 100%
    */  
    let enemyEnergies = JSON.parse(sessionStorage.enemyEnergies)
    let actionProbability = [0, 0, 0, 0];

    if (enemyEnergies.length > 2) actionProbability = [0.25, 0.50, 0.20, 0.05];
    else if (enemyEnergies.length > 0) actionProbability = [0.50, 0.10, 0, 0.40];
    else actionProbability = [0, 0, 0, 1];
    console.log(actionProbability);
    const rng = Math.floor(Math.random() * actionProbability.length);

    switch (0)
    {
        case 0: //Switch
            let random = Math.ceil(Math.random() * 3);
            console.log(random)
            SwitchCharacter(canvas, random, true);
            break;
        case 1: //Weak Attack
            const weakAtk = JSON.parse(sessionStorage.enemyActiveChar).weakAttack;
            Attack(weakAtk, canvas, 0, "activeChar", "enemyEnergies");
            break;
        case 2: //Strong Attack
            const strongAtk = JSON.parse(sessionStorage.enemyActiveChar).strongAttack;
            Attack(strongAtk, canvas, 1, "activeChar", "enemyEnergies");
            break;
        case 3: //End Turn
            EndTurn(canvas, false);
            break;
        default:
            console.log("None whaaaat");
    }
}

function EndTurn(canvas, isPlayer)
{
    playerTurn = !isPlayer;
    if (!isPlayer)
    {
        let gameText;
        if (JSON.parse(sessionStorage.loggedIn)) gameText = JSON.parse(sessionStorage.username) + "'s turn";
        else gameText = JSON.parse(sessionStorage.guestName) + "'s turn";
        DisplayInfoBox(canvas, "Select an attack by clicking on it. The attack you choose will consume the energy(s) shown beside the attack. You are on the bottom side (cards facing up)", gameText);
        return;
    }

    DisplayInfoBox(canvas, "Wait for enemy to end turn", "Enemy's turn");
}