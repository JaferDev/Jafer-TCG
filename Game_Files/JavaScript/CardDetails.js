import {Attack, ElementType, Character} from "./modules/GameData.js";

function AddAllData()
{
    AddCharacterCards();
}

function AddCharacterCards()
{
    let characters = []; //Array[Character]
    
    //Axel
    const axelWeakAtk = new Attack("Front Slash", [ElementType.ice], 10, "Throws an axe towards the enemy");
    const axelStrongAtk = new Attack("Triple Slash", [ElementType.ice, ElementType.ice, ElementType.fire], 35, "Gets two more axes to throw at the enemy");
    characters.push(new Character("Axel", [ElementType.ice], 110, axelWeakAtk, axelStrongAtk, "Baqir Hussain"));

    //Dragonflee
    const dragonfleeWeakAtk = new Attack("Sting Slap", [ElementType.flora], 12, "Slaps enemy with stinger");
    const dragonfleeStrongAtk = new Attack("Mega Sting", [ElementType.flora, ElementType.flora, ElementType.wind], 40, "Puffs up stinger and stings enemy");
    characters.push(new Character("Dragonflee", [ElementType.flora, ElementType.wind], 90, dragonfleeWeakAtk, dragonfleeStrongAtk, "Baqir Hussain"));

    //Pauper Scheet
    const pauperscheetWeakAtk = new Attack("Catch", [ElementType.wind], 42, "Surrounds enemy with itself");
    const papuperscheetStrongAtk = new Attack("Paper Cuts", [ElementType.wind, ElementType.wind, ElementType.wind], 40, "Straightens up and gives paper cuts");
    characters.push(new Character("Pauper Scheet", [ElementType.wind], 70, pauperscheetWeakAtk, papuperscheetStrongAtk, "Baqir Hussain"));

    localStorage["Characters"] = JSON.stringify(characters);
    console.log(characters);
}

window.onload = AddAllData;