const CHARIMGPATH = "../Sprites/CharacterCards/"

class Attack
{
    /**
     * 
     * @param {string} name 
     * @param {Array[ElementType]} types 
     * @param {number} dmg 
     * @param {string} desc 
     */
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
    /**
         * @param {string} name - Character name
         * @param {Array[ElementType]} types - Character types
         * @param {number} hp - Character HP
         * @param {Attack} weakAttack - Character's weak attack
         * @param {Attack} strongAttack - Character's strong attack
         * @param {string} imagePath - URL to get image
         * @param {string} ideaBy - Who provided the developer (JaferDev) with the idea
         */
    constructor(name, types, hp, weakAttack, strongAttack, ideaBy)
    {
        this.name = name;
        this.types = types;
        this.hp = hp;
        this.weakAttack = weakAttack;
        this.strongAttack = strongAttack;
        this.imagePath = CHARIMGPATH + name + ".png";
        this.ideaBy = ideaBy;
    }
}

function FindWeakness(type)
{
    switch (type)
    {
        case ElementType.water:
            return ElementType.electricity;
        
        case ElementType.wind:
            return ElementType.ground;

        case ElementType.ground:
            return ElementType.flora;

        case ElementType.flora:
            return ElementType.fire;
        
        case ElementType.fire:
            return ElementType.water;

        case ElementType.ice:
            return ElementType.fire;

        case ElementType.electricity:
            return ElementType.wind;
    }
}

function FindReactions(type)
{
    switch (type)
    {
        case ElementType.water:
            return [ElementType.wind, ElementType.fire, ElementType.ice];
        
        case ElementType.wind:
            return [ElementType.water, ElementType.fire, ElementType.ice];

        case ElementType.ground:
            return [ElementType.flora, ElementType.electricity, ElementType.ground];

        case ElementType.flora:
            return [ElementType.ground, ElementType.fire, ElementType.flora];
        
        case ElementType.fire:
            return [ElementType.water, ElementType.wind, ElementType.flora];

        case ElementType.ice:
            return [ElementType.wind, ElementType.water, ElementType.ice];

        case ElementType.electricity:
            return [ElementType.ground, ElementType.flora, ElementType.electricity];
    } 
}

export {Attack, ElementType, Character, FindReactions, FindWeakness};