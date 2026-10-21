class Attack
{
    constructor(name, types, dmg)
    {
        this.name = name;
        this.types = types;
        this.dmg = dmg;
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
    constructor(name, types, hp, weakAttack, strongAttack)
    {
        /**
         * @param {string} name - Character name
         * @param {Array[ElementType]} types - Character types
         * @param {number} hp - Character HP
         * @param {Attack} weakAttack - Character's weak attack
         * @param {Attack} strongAttack - Character's strong attack
         */

        this.name = name;
        this.types = types;
        this.hp = hp;
        this.weakAttack = weakAttack;
        this.strongAttack = strongAttack;
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
    const dragonfleeWeakAtk = new Attack("Sting Slap", [ElementType.flora], 10);
    const dragonfleeStrongAtk = new Attack("Mega Sting", [ElementType.flora, ElementType.flora, ElementType.wind], 40);
    characters.push(new Character("Dragonflee", [ElementType.flora, ElementType.wind], 100, dragonfleeWeakAtk, dragonfleeStrongAtk));

    localStorage["Characters"] = characters;

}