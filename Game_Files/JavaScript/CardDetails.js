class Attack
{
    constructor(name, types, dmg, desc)
    {
        this.name = name;
        this.types = types;
        this.dmg = dmg;
        this.desc = desc
    }
}

class ElementType
{
    static water = "water";
    static wind = "wind";
    static ground = "ground";
    static electricity = "electricity";
    static flora = "flora";
    static fire = "fire";
    static ice = "ice";
}

class Character
{
    constructor(name, types, hp, weakAttack, strongAttack, imagePath, ideaBy)
    {
        /**
         * @param {string} name - Character name
         * @param {Array[ElementType]} types - Character types
         * @param {number} hp - Character HP
         * @param {Attack} weakAttack - Character's weak attack
         * @param {Attack} strongAttack - Character's strong attack
         * @param {string} imagePath - URL to get image
         * @param {string} ideaBy - Who provided the developer (JaferDev) with the idea
         */

        this.name = name;
        this.types = types;
        this.hp = hp;
        this.weakAttack = weakAttack;
        this.strongAttack = strongAttack;
        this.imagePath = imagePath;
        this.ideaBy = ideaBy;
    }
}

function AddAllData()
{
    AddCharacterCards();
}

function AddCharacterCards()
{
    let characters = []; //Array[Character]
    
    //Axel
    const axelWeakAtk = new Attack("Front Slash", [ElementType.ice], 10);
    const axelStrongAtk = new Attack("Triple Slash", [ElementType.ice, ElementType.ice, ElementType.fire], 40);
    characters.push(new Character("Axel", [ElementType.ice], 100, axelWeakAtk, axelStrongAtk));

    //Dragonflee
    const dragonfleeWeakAtk = new Attack("Sting Slap", [ElementType.flora], 15);
    const dragonfleeStrongAtk = new Attack("Mega Sting", [ElementType.flora, ElementType.flora, ElementType.wind], 50);
    characters.push(new Character("Dragonflee", [ElementType.flora, ElementType.wind], 100, dragonfleeWeakAtk, dragonfleeStrongAtk));

    localStorage["Characters"] = JSON.stringify(characters);
    console.log(characters);
}

window.onload = AddAllData;