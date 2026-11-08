import {ElementType, Character, Sound } from "./modules/GameData.js"

window.onload = Init;
window.SelectEnergy = SelectEnergy;

const NUMTYPES = 10;
const SELECTABLETYPES = 5;
const TYPEIMGPATH = "../Sprites/Types/";
const ACTIVEPAGE = "3_selectactive.html";

let rngEnergies = [];
let enemyRngEnergies = [];
let selectedEnergies = []; //Array[ElementType]
let selectedIndexes = [];
let pickSound;
function Init()
{
    pickSound = new Sound("../Audio/TakeEnergy.mp3", 0.5);
    let username;
    if (JSON.parse(sessionStorage.loggedIn)) username = "LOGOUT";
    else username = "LOGIN"
    document.getElementById("Logout").innerHTML = username;
    
    EnemyEnergies();
    rngEnergies = RandomiseEnergies(JSON.parse(sessionStorage.Characters));
}

/**
 * Randomises Energies from index 0 - 9
 * Slightly lower chance of secondary energy type
 * @return {Array[ElementType]} rngEnergies - Randomly generated array of energies 
 */
function RandomiseEnergies(characters)
{
    /*
        Primary elements chance = 0.70
        Secondary elements chance = 0.30
    */
    characters = GetAliveChars(characters);
    let energies = [];
    let allElements = GetPrimarySecondaryTypes(characters);
    let primaryTypes = allElements[0]; let secondaryTypes = allElements[1];

    for(let i = 0; i < NUMTYPES; i++)
    {
        let rng = Math.random();
        if (secondaryTypes.length == 0) energies.push(primaryTypes[Math.floor(Math.random() * primaryTypes.length)]);
        else
        {
            if (rng >= 0.30) energies.push(primaryTypes[Math.floor(Math.random() * primaryTypes.length)]);
            else energies.push(secondaryTypes[Math.floor(Math.random() * secondaryTypes.length)]);
        }
    } 

    return energies;
}

/**
 * Gets two exclusive sets of primary elements and secondary elements
 * @param {Array[Character]} characters 
 * @returns {Array[ElementType]} 
 */
function GetPrimarySecondaryTypes(characters)
{
    let primaryElements = [];
    let secondaryElements = [];

    characters.forEach(character => {
        let types = character.types;
        if (types.length == 1) 
        {
            if (!primaryElements.includes(types[0])) primaryElements.push(types[0]);
        }
        else
        {
            if (!primaryElements.includes(types[0])) primaryElements.push(types[0]);
            if (!secondaryElements.includes(types[1]) && !primaryElements.includes(types[1])) secondaryElements.push(types[1]);
        }
    });

    return [primaryElements, secondaryElements];
}

/**
 * Flips energy if its face down and player hasn't selected SELECTABLETYPES yet
 * @param {number} energyIndex 
 */
function SelectEnergy(energyIndex)
{
    pickSound.Play();
    if (selectedEnergies.length == SELECTABLETYPES || selectedIndexes.includes(energyIndex)) return;

    let htmlCode = document.getElementById("EnergyContainer").innerHTML;
    let newHTMLCode = FindAndReplace(htmlCode, energyIndex);
    
    document.getElementById("EnergyContainer").innerHTML = newHTMLCode;

    selectedEnergies.push(rngEnergies[energyIndex]);
    selectedIndexes.push(energyIndex);

    DisplayChange(energyIndex);

    if (selectedEnergies.length == SELECTABLETYPES) SelectedAll();
}

function DisplayChange(energyIndex)
{
    let selectionElement = document.getElementById("SelectionDisplay");
    if (!selectionElement.classList.contains("SelectionDisplay")) selectionElement.classList.add("SelectionDisplay");
    
    if (selectedEnergies.length == 1) selectionElement.innerHTML += rngEnergies[energyIndex];
    else selectionElement.innerHTML += ", " + rngEnergies[energyIndex]
}

/**
 * Searches for line containing searchItem and replaces the src with previously randomly generated ElementType Image
 * @param {string} text 
 * @param {string} searchItem 
 * @return {string} HTML5 Code replacing TypesBack.png with rngTypes[searchItem].png 
 */
function FindAndReplace(text, searchItem)
{
    let lines = text.split("\n")

    for (let i = 0; i < lines.length; i++)
    {
        if (lines[i].includes(searchItem)) 
        {
            let startIndex = lines[i].indexOf(TYPEIMGPATH);
            let randomEnergy = rngEnergies[searchItem];
            let newLine = lines[i].substring(0, startIndex + TYPEIMGPATH.length) + randomEnergy + lines[i].substring(startIndex + TYPEIMGPATH.length + 8);
            lines[i] = newLine;
        }
    }

    return lines.join("\n");    
}

let timeLeft = 4;
function SelectedAll()
{
    AddToStorage();
    DisplayNew()
    setInterval( DisplayNew, 1000 );
}

function DisplayNew()
{
    timeLeft --;
    if (timeLeft <= 0) location.replace(ACTIVEPAGE);
    document.getElementById("ConfirmButton").innerHTML = "<div class=\"RoundInform \" id= \"Informant \">Pick Active in " + timeLeft +"..</div>";
}

function AddToStorage()
{
    sessionStorage["Energy"] = JSON.stringify(selectedEnergies);
}

function EnemyEnergies()
{
    AddEnemyCharacters();
    enemyRngEnergies = RandomiseEnergies(JSON.parse(sessionStorage.enemyCharacters));
    sessionStorage["enemyEnergies"] = JSON.stringify(GetRandom(enemyRngEnergies, 5));
}

function AddEnemyCharacters()
{
    if (JSON.parse(sessionStorage.enemyCharacters) === null) 
    {
        let rngCharacters = GetRandom(JSON.parse(localStorage.Characters), 3);
        sessionStorage["enemyCharacters"] = JSON.stringify(rngCharacters);
    }

    let enemyChars = JSON.parse(sessionStorage.enemyCharacters);
    enemyChars = GetAliveChars(enemyChars);
    sessionStorage["enemyActiveChar"] = JSON.stringify(enemyChars[Math.floor(Math.random() * enemyChars.length)]);
}

function GetAliveChars(characters)
{
    let aliveCharacters = [];
    characters.forEach(character => {if (character.hp != 0) aliveCharacters.push(character);});
    return aliveCharacters;
}

/**
 * Shuffles array using Fischer-Yates Algorithm 
 * @param {Array[any]} array 
 * @param {number} n 
 * @returns {Array[any]} First n elements of shuffle Array
 */
function GetRandom(array, n)
{
    let currentIndex = array.length;

    while (currentIndex != 0) 
    {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array.slice(0, n);
}