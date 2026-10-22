const HOMEPAGE = "../index.html";
const CHARACTERPAGE = "2_choosechar.html";
const POWERUPPAGE = "3_choosepowerup.html";
const GAMEPAGE = "4_game.html";

let userInfo = {loggedIn: false, playerName : "", charsSelected: [], powerupsSelected: []};

function GoHome()
{
    location.replace(HOMEPAGE);
}

function SelectPowerup(powerIndex)
{
    console.log(loginDetails);
    console.log(userInfo);
    if (userInfo.powerupsSelected.includes(powerIndex)) DeselectCharacter(powerIndex);
    else if (userInfo.powerupsSelected.length == MAXPOWERUPSSELECT) console.log("Can't add more");
    else userInfo.powerupsSelected.push(powerIndex);
}

function DeselectPowerup(powerIndex)
{
    userInfo.powerupsSelected = userInfo.powerupsSelected.filter(item => item != powerIndex);
}

function ConfirmPowerupSelection()
{
    if (userInfo.powerupsSelected.length != MAXPOWERUPSSELECT) {console.log("Nop"); return;}

    location.replace(GAMEPAGE);
}

function GoChooseCharacter()
{
    location.replace(CHARACTERPAGE);
}