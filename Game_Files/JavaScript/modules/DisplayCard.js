import {Character, FindWeakness, FindReactions} from "./GameData.js";

/**
     * Generates HTML Code to display a character card on the screen
     * @param {Character} character - Character to be displayed
     * @return {string} htmlString - String containing HTML5 code
*/
function CardHTML(character, onClick)
{
    console.log(onClick);
    return `
        <div class="Card" onclick=${onClick}>
                <div class="CardHeadContainer">
                    <img src="${GetTypesPath(character.types[0])}" class="CardHeadType">
                    <p class="CardHead">${character.name}</p>
                    <p class="CardHP">HP:</p>
                    <p class="CardHead">${character.hp}</p>
                </div>    
                <img src="${character.imagePath}" class="CardImage">
                <div class="AtkInfoContainer">
                    <div class="Atk">
                        <div class="AtkHead">
                            <img src="${GetTypesPath(character.weakAttack.types[0])}" class="AtkType">
                            <p class="AtkName">${character.weakAttack.name}</p>
                            <p class="AtkHP">${character.weakAttack.dmg}</p>       
                        </div>
                        <p class="AtkDesc">${character.weakAttack.desc}</p>
                    </div>
                    <div class="Atk">
                        <div class="AtkHead">
                            <img src="${GetTypesPath(character.strongAttack.types[0])}" class="AtkType">
                            <img src="${GetTypesPath(character.strongAttack.types[1])}" class="AtkType">
                            <img src="${GetTypesPath(character.strongAttack.types[2])}" class="AtkType">
                            <p class="AtkName">${character.strongAttack.name}</p>
                            <p class="AtkHP">${character.strongAttack.dmg}</p>
                        </div>
                        <p class="AtkDesc">${character.weakAttack.desc}</p>
                    </div>
                    <div class="DefaultDetails">
                        <div class="HalfDetail">
                            <p class="SmallDetail">Weakness</p>
                            <img src="${GetTypesPath(FindWeakness(character.types[0]))}" class="AtkType">
                            <p class="SmallDetail">x 1.1</p>
                        </div>
                        <div class="HalfDetail">
                            <p class="SmallDetail">Reactions</p>
                            <img src="${GetTypesPath(FindReactions(character.types[0])[0])}" class="DetailType">
                            <img src="${GetTypesPath(FindReactions(character.types[0])[1])}" class="DetailType">
                            <img src="${GetTypesPath(FindReactions(character.types[0])[2])}" class="DetailType">
                            <p class="SmallDetail">x 1.1</p>
                        </div>
                    </div>
                </div> 
                <div class="CreditsContainer">
                    <p class="Credits">Idea By: ${character.ideaBy}</p>
                    <p class="Credits">Art By: Jafer Hussain</p>
                </div>
            </div>
    `
}

function DisplayOnPage(htmlContent)
{
    document.getElementById("CardContainer").innerHTML = htmlContent;
}

/**
 * 
 * @param {ElementType} type 
 * @returns {string} Path to type image
 */
function GetTypesPath(type)
{
    return "../Sprites/Types/" + type + ".png";
}

/**
 * 
 * @param {Array[Character]} characters - Array of characters to display 
 * @param {Array[string]} onClick - Functions to execute
 */
function DisplayCards(characters, onClick = [""])
{
    let htmlContent = "";
    let index = 0;
    characters.forEach(character => {
        htmlContent += CardHTML(character, onClick[index]);
        index++;
    });
    DisplayOnPage(htmlContent);
}

export {CardHTML, DisplayOnPage, DisplayCards};