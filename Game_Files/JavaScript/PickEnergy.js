import {ElementType, Character} from "./modules/GameData.js"

window.onload = RandomiseEnergies;
window.SelectEnergy = SelectEnergy;

const NUMTYPES = 10;
const SELECTABLETYPES = 5;
const TYPEIMGPATH = "../Sprites/Types/";
const GAMEPAGE = "5_game.html";

let rngEnergies = [];
let selectedEnergies = []; //Array[ElementType]
let selectedIndexes = [];

/**
 * Randomises Energies from index 0 - 9
 * Slightly lower chance of secondary energy type
 * @return {Array[ElementType]} rngEnergies - Randomly generated array of energies 
 */
function RandomiseEnergies()
{
    /*
        Go through primary elements of selected characters
        Go through secondary elements of selected characters
        If primary element of one is secondary element of other, remove from secondary elements
        Mutually exclusive sets
        Primary elements chance = 0.70
        Secondary elements chance = 0.30
    */

    let allElements = GetPrimarySecondaryTypes(JSON.parse(sessionStorage.Characters));
    let primaryTypes = allElements[0]; let secondaryTypes = allElements[1];
    console.log(allElements);
    for(let i = 0; i < NUMTYPES; i++)
    {
        let rng = Math.random();
        if (secondaryTypes.length == 0) rngEnergies.push(primaryTypes[Math.floor(Math.random() * primaryTypes.length)]);
        else
        {
            if (rng >= 0.30) rngEnergies.push(primaryTypes[Math.floor(Math.random() * primaryTypes.length)]);
            else rngEnergies.push(secondaryTypes[Math.floor(Math.random() * secondaryTypes.length)]);
        }
    } 
}

/**
 * 
 * @param {Array[Character]} characters 
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

function SelectEnergy(energyIndex)
{
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
 */
function FindAndReplace(text, searchItem)
{
    let lines = text.split("\n")
    console.log(lines);
    console.log(rngEnergies);
    for (let i = 0; i < lines.length; i++)
    {
        if (lines[i].includes(searchItem)) 
        {
            let startIndex = lines[i].indexOf(TYPEIMGPATH);
            let randomEnergy = rngEnergies[searchItem];
            let newLine = lines[i].substring(0, startIndex + TYPEIMGPATH.length) + randomEnergy + lines[i].substring(startIndex + TYPEIMGPATH.length + 8);
            console.log(newLine);
            lines[i] = newLine;
        }
    }
    console.log(lines.toString);
    return lines.join("\n");    
}

let timeLeft = 6;
function SelectedAll()
{
    AddToStorage();
    DisplayNew()
    setInterval(DisplayNew, 1000);
}

function DisplayNew()
{
    timeLeft --;
    if (timeLeft <= 0) location.replace(GAMEPAGE);
    document.getElementById("Informant").innerHTML = "<div class=\"RoundInform \" id= \"Informant \">Round begins in " + timeLeft +"..</div>";
}

function AddToStorage()
{
    sessionStorage["Energy"] = JSON.stringify(selectedEnergies);
}