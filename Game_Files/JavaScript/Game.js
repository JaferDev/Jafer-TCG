import { DisplayCards, DisplayOnPage, CardHTML } from "./modules/DisplayCard.js";
import { Rectangle, Img, CanvasElement, Text, ClearPortion, Transform } from "./modules/CanvasDisplay.js";
import { FindWeakness, FindReactions, ElementType } from "./modules/GameData.js";

window.onload = Init;

const TYPESSOURCE = "../Sprites/Types/";
let canvasElements = []; //Array[Interactable]
let confirmingWeakAtk = false;
let confirmingStrongAtk = false;
let playerTurn = true;
let selectingEnergy = false;
let selectedEnergy = false;
let playerEnded = false;
let enemyEnded = false;
let enemyAtkFailed = false;

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
    EndButton(canvas);
    TransparentButton(canvas);
    DisplayAllCards();
    DisplayAtkInfo(canvas);
    DisplayEnergies(canvas);
    DisplayInfoBox(canvas, "Select an attack by clicking on it. Switch characters by clicking on any character");
    DisplayGameBox(canvas, "");
}

function EndButton(canvas)
{
    const STARTX = canvas.width / 2 - 60; const STARTY = canvas.height / 2 + 30;
    const endContainer = new Img("../Sprites/UI/EndContainer.png", STARTX + 15, STARTY - 40, 100, 100, () => {EndRound(canvas, true);});
    endContainer.DrawImage(canvas);
    canvasElements.push(endContainer);
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
    
    ClearPortion(canvas, STARTX1 - 60, STARTY1 - 50, 180, 260);
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
    
    AtkInfo(canvas, TYPEWIDTH, TYPEHEIGHT, JSON.parse(sessionStorage.activeChar), 80, 440, false);
    //AtkInfo(canvas, TYPEWIDTH, TYPEHEIGHT, JSON.parse(sessionStorage.enemyActiveChar), 1105, 170, true);
}
function AtkInfo(canvas, typesWidth, typesHeight, activeChar, STARTX, STARTY, isEnemy)
{
    //Creating
    //WeakAtk
    const backgroundRectangle1 = new Rectangle(STARTX, STARTY, 260, 110, "rgba(0, 0, 0, 0.2)", () => {SelectAtk(canvas, 0);});

    const weakType = new Img(TYPESSOURCE + activeChar.weakAttack.types[0] + ".png", STARTX + 5, STARTY + 10, typesWidth, typesHeight);
    const weakAtkHeader = new Text(STARTX + 60, STARTY + 40, activeChar.weakAttack.name, "silkscreenRegular", 20);
    const weakDmg = new Text(STARTX + 230, STARTY + 40, activeChar.weakAttack.dmg, "silkscreenRegular", 20);
    
    //StrongAtk
    const backgroundRectangle2 = new Rectangle(STARTX, STARTY + 130, 260, 110, "rgba(0, 0, 0, 0.2)",() => {SelectAtk(canvas, 1);});
    const strongType1 = new Img(TYPESSOURCE + activeChar.strongAttack.types[0] + ".png", STARTX + 5, STARTY + 145, typesWidth, typesHeight)
    const strongType2 = new Img(TYPESSOURCE + activeChar.strongAttack.types[1] + ".png", STARTX + 25, STARTY + 145, typesWidth, typesHeight)
    const strongType3 = new Img(TYPESSOURCE + activeChar.strongAttack.types[2] + ".png", STARTX + 45, STARTY + 145, typesWidth, typesHeight)
    const strongAtkHeader = new Text(STARTX + 80, STARTY + 170, activeChar.strongAttack.name, "silkscreenRegular", 20);
    const strongDmg = new Text(STARTX + 230, STARTY + 170, activeChar.strongAttack.dmg, "silkscreenRegular", 20);
    
    if (!isEnemy) canvasElements.push(backgroundRectangle1, backgroundRectangle2);
    
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
    //const enemyAtkInfoContainer = new Rectangle(1100, 150, 270, 270, "rgba(255, 255, 255, 0.5)");

    playerAtkInfoContainer.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
    //enemyAtkInfoContainer.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
}

function DisplayAllCards()
{
    const inactiveCharacters = GetInactiveCharacters();
    DisplayCards(inactiveCharacters[1], "", "TopCards", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.activeChar), "", "playerChar"), "playerActive", 0.7);
    DisplayOnPage(CardHTML(JSON.parse(sessionStorage.enemyActiveChar), "", "enemyChar"), "enemyActive", 0.7);
    DisplayCards(inactiveCharacters[0], "", "BottomCards", 0.7);
}

function GetInactiveCharacters(isDead = false)
{
    const playerChars = JSON.parse(sessionStorage.Characters);
    const enemyChars = JSON.parse(sessionStorage.enemyCharacters);
    const playerChar = JSON.parse(sessionStorage.activeChar);
    const enemyChar = JSON.parse(sessionStorage.enemyActiveChar);
    //extraCondition true by default, if you want to check if character is dead (as in SwitchCharacter()), you can add extraCondition
    let extraCondition = true
    let inactivePlayerCharacters = []; let inactiveEnemyCharacters = [];
    for(let i = 0; i < playerChars.length; i++) 
    {
        if (isDead) extraCondition = playerChars[i].hp != 0;
        
        if (playerChars[i].name != playerChar.name && extraCondition) inactivePlayerCharacters.push(playerChars[i]);
    }

    for(let i = 0; i < enemyChars.length; i++) 
    {
        if (isDead) extraCondition = enemyChars[i].hp != 0;

        if (enemyChars[i].name != enemyChar.name && extraCondition) inactiveEnemyCharacters.push(enemyChars[i]);
    }

    return [inactivePlayerCharacters, inactiveEnemyCharacters] ;
} 

function DisplayGameBox(canvas, action = "", STARTX = 80, STARTY = 60)
{
    let player;
    if (JSON.parse(sessionStorage.loggedIn)) player = JSON.parse(sessionStorage.username);
    else player = JSON.parse(sessionStorage.guestName);

    let curTurn = ["Enemy", player][+ playerTurn];

    ClearPortion(canvas, STARTX, STARTY, 400, 100);
    let gameText = "TURN: " + curTurn + " | " + action;
    const gameInfo = new Rectangle(STARTX, STARTY, 400, 75, "rgba(255, 255, 255, 1)");
    gameInfo.DrawRectangle(canvas, true, "rgb(0, 0, 0)", 5);
    DisplayMultipleLines(canvas, gameText, 25, STARTX + 10, STARTY + 25, 20, "silkscreenRegular", "rgb(0, 0, 0)");
}

function DisplayInfoBox(canvas, text, STARTX = 80, STARTY = 710)
{
    //Creating Objects
    ClearPortion(canvas, STARTX, STARTY, 400, 100);
    
    const infoBg = new Rectangle(80, STARTY, 400, 100, "rgba(0,0,0, 0.5)");
    const reminderBg = new Rectangle(10, 10, 420, 30, "rgba(0, 0, 0, 1)")
    const reminderTxt = new Text(20, 30, "REMINDER: Kindly play the entire game in full screen (F11)", "anta", 15, "rgb(255, 255, 255)");

    infoBg.DrawRectangle(canvas, true, "rgba(0, 0, 0, 1)", 5); 
    reminderBg.DrawRectangle(canvas, true, "rgb(0, 0, 0, 1)", 5);
    reminderTxt.Write(canvas);
    
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

function SelectAtk(canvas, atkStrength)
{
    if (!playerTurn) return;
    const character = JSON.parse(sessionStorage.activeChar);
    const atk = [character.weakAttack, character.strongAttack][atkStrength];

    if (atkStrength == 0) 
    {
        if (confirmingWeakAtk) 
        { 
            Attack(atk, canvas, atkStrength, "enemyActiveChar", "Energy"); 
            confirmingWeakAtk = false
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
            confirmingStrongAtk = false;
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
    if (!CheckEnoughEnergy(atk, energiesKey))
    {
        DisplayGameBox(canvas, "Attack Failed");
        if (playerTurn) DisplayInfoBox(canvas, "Not enough energy to use " + atk.name + ". Do you want to switch characters?");
        else enemyAtkFailed = true;
        return;
    }

    let opponentActive = JSON.parse(sessionStorage[opponentKey]);
    if (!playerTurn) { DisplayGameBox(canvas, "Attacking"); }

    let dmg = GetDmg(atk, opponentActive);
    DamageOpponent(canvas, dmg);
    DisplayDmg(canvas, dmg);
    console.log("Done with dmg opponent and display damage");
    playerTurn = !playerTurn; //After attack, its enemy's turn unless they ended turn

    DisplayEnergies(canvas);
    DisplayAllCards();
    if (!playerTurn || playerEnded) setTimeout(() => {EnemyTurn(canvas)}, 1000);
}

function DamageOpponent(canvas, dmg)
{
    let activeChars = [JSON.parse(sessionStorage.activeChar), JSON.parse(sessionStorage.enemyActiveChar)];
    let allCharacters = [JSON.parse(sessionStorage.Characters),JSON.parse(sessionStorage.enemyCharacters)];
    let activeChar = activeChars[+ playerTurn];
    let chars = allCharacters[+ playerTurn];

    chars.forEach(character => {
        if (character.name == activeChar.name) character.hp -= dmg;
    });

    activeChar.hp -= dmg;
    console.log(chars, activeChar);
    if (activeChar.hp < 1) 
    {
        chars = CharacterDeath(activeChar);
        if (DeadCount(chars) == 3) GameOver();
        else setTimeout( () => {SwitchCharacter(canvas, Math.ceil(Math.random() * 2 + 1), !playerTurn, false);}, 2500);
    }

    if (!playerTurn)
    {
        sessionStorage.activeChar = JSON.stringify(activeChar);
        sessionStorage.Characters = JSON.stringify(chars);
    }
    else
    {
        sessionStorage.enemyActiveChar = JSON.stringify(activeChar);
        sessionStorage.enemyCharacters = JSON.stringify(chars);
    }
}

function DeadCount(characters)
{
    let cnt = 0;
    characters.forEach(character => {if (character.hp == 0) cnt += 1;});
    return cnt;
}

function CharacterDeath(character)
{
    character.hp = 0;

    let playerCharacters = JSON.parse(sessionStorage.Characters);
    let enemyCharacters = JSON.parse(sessionStorage.enemyCharacters);

    if (playerTurn) enemyCharacters.forEach(char => {if (char.name == character.name) char.hp = 0;});
    else playerCharacters.forEach(char => {if (char.name == character.name) char.hp = 0;});
    
    if (playerTurn) return enemyCharacters;
    return playerCharacters;
}

function DisplayDmg(canvas, dmg)
{
    const playerDmgTransform = new Transform(canvas.width / 2 - 80, canvas.height / 2 - 100, 50, 50);//Enemy dmgs player
    const enemyDmgTransform = new Transform(canvas.width / 2 + 30, canvas.height / 2 + 110, 50, 50);//Player dmgs enemy
    const curTransform = [playerDmgTransform, enemyDmgTransform][+ playerTurn];

    const dmgBorder = new Img("../Sprites/UI/DmgBorder.png", curTransform.x, curTransform.y, curTransform.width, curTransform.height);
    const dmgInside = new Img("../Sprites/UI/DmgInside.png", curTransform.x, curTransform.y, curTransform.width, curTransform.height);
    const dmgAmt = new Text(curTransform.x + 7, curTransform.y + 30, "-" + dmg, "silkscreenRegular", 20, "rgb(255, 0, 0)");
    
    ClearPortion(canvas, playerDmgTransform.x, playerDmgTransform.y, playerDmgTransform.width, playerDmgTransform.height);
    ClearPortion(canvas, enemyDmgTransform.x, enemyDmgTransform.y, enemyDmgTransform.width, enemyDmgTransform.height);

    dmgBorder.DrawImage(canvas);
    dmgInside.DrawImage(canvas);
    dmgAmt.Write(canvas);

    setTimeout(() => {
        ClearPortion(canvas, playerDmgTransform.x, playerDmgTransform.y, playerDmgTransform.width, playerDmgTransform.height);
        ClearPortion(canvas, enemyDmgTransform.x, enemyDmgTransform.y, enemyDmgTransform.width, enemyDmgTransform.height);
    }, 2500);
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
            if (energy[j] == atk.types[i]) { energy.splice(j, 1); energiesRemoved++; break;}
        }
    }
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
    if (enemy.elementApplied === null) return Math.ceil(totalDmg);;

    if (CheckAnyInArray(FindReactions(enemy.elementApplied), atk.types)) { enemy.elementApplied = atk.types[0]; return Math.ceil(totalDmg * 1.1);}; 
    return Math.ceil(totalDmg);
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
    if (!playerTurn && !playerEnded) return;
    if (JSON.parse(sessionStorage.Energy).length == 0 && !selectedEnergy){ DisplayInfoBox(canvas, "You need at least one energy to switch characters. You can end turn by clicking on the button on the left"); return; }
    
    if (selectedEnergy) { selectedEnergy = false; SwitchCharacter(canvas, charNum, false); return;}
    selectingEnergy = true;

    DisplayInfoBox(canvas, "You need to use any one energy to switch characters. Select it by clicking on it");
} 

function SelectEnergy(canvas, energy, isEnemy = false)
{
    if (!isEnemy) if (!selectingEnergy) return;
    let energies;
    
    if (!isEnemy) { selectingEnergy = false; energies = JSON.parse(sessionStorage.Energy); }
    else energies = JSON.parse(sessionStorage.enemyEnergies);

    for(let i = 0; i < energies.length; i++)
    {
        if (energy == energies[i]) { energies.splice(i, 1); break;}
    }

    if (!isEnemy)  
    {
        sessionStorage.Energy = JSON.stringify(energies)
        DisplayInfoBox(canvas, "Select a character to switch with by clicking on them");
        selectedEnergy = true;
    }
    else 
    {
        sessionStorage.enemyEnergies = JSON.stringify(energies);
    }

    DisplayEnergies(canvas); 
}

function SwitchCharacter(canvas, charNum, isEnemy = false, isIntentional = true)
{
    let activeChar;
    if (!isEnemy) activeChar = JSON.parse(sessionStorage.activeChar);
    else activeChar = JSON.parse(sessionStorage.enemyActiveChar); 
    console.log("Switching ", isEnemy, isIntentional);
    const inactiveChars = GetInactiveCharacters(true)[+ isEnemy];

    if (inactiveChars.length == 0) 
    { 
        DisplayGameBox(canvas, "No alive characters to switch with"); 
        if (!isIntentional) return;
        playerTurn = !playerTurn;
        if (!isEnemy) EnemyTurn(canvas);
        return; 
    }
    //inactiveChars[0] - charNum = 2
    console.log(inactiveChars);
    if (inactiveChars.length == 1) activeChar = inactiveChars[0];
    else activeChar = inactiveChars[charNum - 2];
    
    if (activeChar == -1) activeChar = 1;
    if (!isEnemy) sessionStorage.activeChar = JSON.stringify(activeChar); 
    else sessionStorage.enemyActiveChar = JSON.stringify(activeChar);

    DisplayGameBox(canvas, "Switching Character!");
    DisplayAllCards();
    DisplayAtkInfo(canvas);

    if (!isIntentional) return;
    playerTurn = !playerTurn;
    if (!isEnemy) EnemyTurn(canvas);
}

function EnemyTurn(canvas)
{
    if (playerTurn || enemyEnded) return;

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

    let probabilities = {"Switch": 0, "WeakAtk": 0, "StrongAtk": 0, "EndRnd": 0};
    if (enemyEnergies.length > 2) probabilities = {"Switch": 0.25, "WeakAtk": 0.50, "StrongAtk": 0.20, "EndRnd": 0};
    else if (enemyEnergies.length > 0) probabilities = {"Switch": 0.50, "WeakAtk": 0.10, "StrongAtk": 0, "EndRnd": 0.40};
    else probabilities = {"Switch": 0, "WeakAtk": 0, "StrongAtk": 0, "EndRnd": 1};
    
    if (enemyAtkFailed && enemyEnergies.length > 0) 
    {
        probabilities["Switch"] = 1 - probabilities["EndRnd"];
        probabilities["StrongAtk"] = 0; probabilities["WeakAtk"] = 0;
        enemyAtkFailed = false;
    }
    const action = GetRandomElement(probabilities);
    const turnTime = 2500;
    switch (action)
    {
        case "Switch":
            setTimeout(() => {
                const energies = JSON.parse(sessionStorage.enemyEnergies);
                let energy = energies[Math.floor(Math.random() * energies.length)];
                SelectEnergy(canvas, energy, true);
                let random = Math.ceil(Math.random() * 2 + 1);
                SwitchCharacter(canvas, random, true);
            }, turnTime);
            break;
        case "WeakAtk":
            setTimeout(() => {
                const weakAtk = JSON.parse(sessionStorage.enemyActiveChar).weakAttack;
                Attack(weakAtk, canvas, 0, "activeChar", "enemyEnergies");
            }, turnTime);
            break;
        case "StrongAtk": //Strong Attack
            setTimeout(() => {
                const strongAtk = JSON.parse(sessionStorage.enemyActiveChar).strongAttack;
                Attack(strongAtk, canvas, 1, "activeChar", "enemyEnergies");
            }, turnTime);
            break;
        case "EndRnd": //End Turn
            setTimeout(() => {EndRound(canvas, false);}, turnTime);
            break;
        default:
            console.log(action);
            break;
    }
    if (!playerEnded) setTimeout(() => {playerTurn = true; DisplayGameBox(canvas, "");}, turnTime * 2);
    else setTimeout( () => {playerTurn = false; EnemyTurn(canvas);}, turnTime * 2);
}

function EndRound(canvas, isPlayer)
{
    if (isPlayer && playerEnded) return;

    if (!isPlayer && !playerEnded)
    {
        enemyEnded = true;
        let gameText;
        if (JSON.parse(sessionStorage.loggedIn)) gameText = JSON.parse(sessionStorage.username) + "'s turn";
        else gameText = JSON.parse(sessionStorage.guestName) + "'s turn";
        DisplayInfoBox(canvas, "Select an attack by clicking on it. Switch character by clicking on any character", gameText);
        DisplayGameBox(canvas, "Turns End");
        return;
    }
    else if ((!isPlayer && playerEnded) || (isPlayer && enemyEnded))//Both player and enemy ended
    {
        DisplayGameBox(canvas, "ROUND END!!");
        setInterval(() => {NextRound();}, 2000);
        return;
    }

    playerEnded = true;
    DisplayGameBox(canvas, "Turns End");
    DisplayInfoBox(canvas, "Wait for enemy to end turn", "Enemy's turn");
    playerTurn = !isPlayer;
    EnemyTurn(canvas);
}

function GetRandomElement(probabilities)
{   
    let sum = 0;
    for(let event in probabilities) sum += probabilities[event];

    let pick = Math.random() * sum;
    for(let event in probabilities)
    {
        pick -= probabilities[event];
        if (pick <= 0) return event;
    }
}

function NextRound()
{
    location.replace("4_pickenergy.html");
}

function GameOver()
{
    console.log("WOOHOOOOOOOOOO");
}