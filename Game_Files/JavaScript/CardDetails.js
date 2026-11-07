import {Attack, ElementType, Character} from "./modules/GameData.js";

window.onload = AddAllData;

function AddAllData()
{
    AddCharacterCards();
    ResetSessionStorage();
}

function AddCharacterCards()
{
    let characters = []; //Array[Character]
    
    //Axel
    const axelWeakAtk = new Attack("Front Slash", [ElementType.ice], 10, "Throws an axe towards the enemy");
    const axelStrongAtk = new Attack("TripleSlash", [ElementType.ice, ElementType.ice, ElementType.fire], 35, "Gets two more axes to throw at the enemy");
    characters.push(new Character("Axel", [ElementType.ice], 110 - 100, axelWeakAtk, axelStrongAtk, "Baqir Hussain"));

    //Dragonflee
    const dragonfleeWeakAtk = new Attack("Sting Slap", [ElementType.flora], 12, "Slaps enemy with stinger");
    const dragonfleeStrongAtk = new Attack("Mega Sting", [ElementType.flora, ElementType.flora, ElementType.wind], 40, "Puffs up stinger and stings enemy");
    characters.push(new Character("Dragonflee", [ElementType.flora, ElementType.wind], 90 - 80, dragonfleeWeakAtk, dragonfleeStrongAtk, "Baqir Hussain"));

    //Pauper Scheet
    const pauperscheetWeakAtk = new Attack("Catch", [ElementType.wind], 13, "Surrounds enemy with itself");
    const papuperscheetStrongAtk = new Attack("Paper Cuts", [ElementType.wind, ElementType.wind, ElementType.wind], 40, "Straightens up and gives paper cuts");
    characters.push(new Character("Pauper Scheet", [ElementType.wind], 70 - 60, pauperscheetWeakAtk, papuperscheetStrongAtk, "Baqir Hussain"));

    //Phoney
    const phoneyWeakAtk = new Attack("Call", [ElementType.electricity], 11, "Calls enemy and throws headphones at them");
    const phoneyStrongAtk = new Attack("Trojan", [ElementType.electricity, ElementType.electricity, ElementType.electricity], 38, "Gives the enemy a phoney file");
    characters.push(new Character("Phoney", [ElementType.electricity], 100 - 90, phoneyWeakAtk, phoneyStrongAtk, "Sughra Fatima"));

    //Blow Torch
    const blowtorchWeakAtk = new Attack("Torch", [ElementType.fire], 11, "Uses it's blowtorch to torch");
    const blowtorchStrongAtk = new Attack("Blow", [ElementType.fire, ElementType.fire, ElementType.wind], 40, "First we blow, then we torch");
    characters.push(new Character("Blow Torch", [ElementType.fire, ElementType.wind], 115 - 105, blowtorchWeakAtk, blowtorchStrongAtk, "Jafer Hussain"));

    localStorage["Characters"] = JSON.stringify(characters);
    console.log(characters);
}

function ResetSessionStorage()
{
    const resetKeys = [ "enemyActiveChar", "enemyEnergies", "enemyCharacters", "turn" ];
    resetKeys.forEach(key => {
        sessionStorage[key] = null; 
    });
    sessionStorage["turn"] = JSON.stringify(1);
}