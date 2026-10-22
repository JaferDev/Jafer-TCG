const HOMEPAGE = "../index.html";
const CHARACTERPAGE = "2_choosechar.html";
const GAMEPAGE = "4_game.html";

let powerupsSelected = [];

function GoHome()
{
    location.replace(HOMEPAGE);
}

function GoChooseCharacter()
{
    location.replace(CHARACTERPAGE);
}

function SelectPowerup(powerupIndex)
{;
    console.log("-----------\n", powerupsSelected);
    if (powerupsSelected.includes(powerupIndex)) DeselectCharacter(powerupIndex);
    else if (powerupsSelected.length != MAXCHARSSELECT) powerupsSelected.push(powerupIndex);
    DisplaySelection()
}   

function DisplaySelection()
{   
    let powerups = JSON.parse(localStorage.Powerups);
    let namesPowerupsSelected = [];

    powerupsSelected.forEach(powerupIndex => {
        namesPowerupsSelected.push(powerups[powerupIndex - 1].name);
    });

    document.getElementById("SelectionDisplay").innerHTML = "Powerups Selected: " + namesPowerupsSelected;
}

function DeselectCharacter(powerupIndex)
{
    powerupsSelected = powerupsSelected.filter(item => item != powerupIndex);
}

function Confirmpowerupselection()
{
    if (powerupsSelected.length != MAXCHARSSELECT) {console.log("Nop"); return;}
    
    let charObjs = [];
    let powerups = JSON.parse(localStorage.Powerups);
    powerupsSelected.forEach(powerupIndex => {
        charObjs.push(powerups[powerupIndex - 1]);
    });
    sessionStorage.Powerups = JSON.stringify(charObjs);

    GoPowerup();
}
