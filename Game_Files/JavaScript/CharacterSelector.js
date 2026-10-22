const HOMEPAGE = "../index.html";
const POWERUPPAGE = "3_choosepowerup.html";

let userInfo = {loggedIn: false, playerName : "", charsSelected: [], powerupsSelected: []};

const MAXCHARSSELECT = 3;
const MAXPOWERUPSSELECT = 2;

function GoHome()
{
    location.replace(HOMEPAGE);
}

function GoPowerup()
{
    location.replace(POWERUPPAGE);
}

function SelectCharacter(charIndex)
{;
    console.log("-----------\n", userInfo.charsSelected);
    if (userInfo.charsSelected.includes(charIndex)) DeselectCharacter(charIndex);
    else if (userInfo.charsSelected.length != MAXCHARSSELECT) userInfo.charsSelected.push(charIndex);
    DisplaySelection()
}   

function DisplaySelection()
{   
    let characters = JSON.parse(localStorage.Characters);
    let namesCharsSelected = [];

    userInfo.charsSelected.forEach(charIndex => {
        namesCharsSelected.push(characters[charIndex - 1].name);
    });

    document.getElementById("SelectionDisplay").innerHTML = "Characters Selected: " + namesCharsSelected;
}

function DeselectCharacter(charIndex)
{
    userInfo.charsSelected = userInfo.charsSelected.filter(item => item != charIndex);
}

function ConfirmCharacterSelection()
{
    if (userInfo.charsSelected.length != MAXCHARSSELECT) {console.log("Nop"); return;}
    
    let charObjs = [];
    let characters = JSON.parse(localStorage.Characters);
    userInfo.charsSelected.forEach(charIndex => {
        charObjs.push(characters[charIndex - 1]);
    });
    sessionStorage["Characters"] = JSON.stringify(charObjs);

    GoPowerup();
}
