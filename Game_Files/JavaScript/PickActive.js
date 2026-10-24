const ENERGYPAGE = "4_pickenergy.html";

let activeChar;

function SelectCharacter(charIndex)
{
    if (activeChar == charIndex) activeChar = undefined;
    else activeChar = charIndex;
    DisplaySelection();
}   

function DisplaySelection()
{   
    if (activeChar == undefined) 
    {
        document.getElementById("SelectionDisplay").innerHTML = "Active Character: ";
        return;
    }

    let characters = JSON.parse(sessionStorage.Characters);
    document.getElementById("SelectionDisplay").innerHTML = "Active Character: " + characters[activeChar].name;
}

function ConfirmCharacterSelection()
{
    if (activeChar == undefined) return;
    
    let characters = JSON.parse(sessionStorage.Characters);
    sessionStorage.activeChar = JSON.stringify(characters[activeChar]);

    location.replace(ENERGYPAGE);
}
