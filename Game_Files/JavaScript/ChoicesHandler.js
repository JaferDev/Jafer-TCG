const HOMEPAGE = "../index.html";
const CHARACTERPAGE = "2_choosechar.html";
const POWERUPPAGE = "3_choosepowerup.html";
const GAMEPAGE = "4_game.html";

let userInfo = {loggedIn: false, playerName : "", charsSelected: [], powerupsSelected: []};
let loginDetails = {usernames: ["abc"], passwords: ["123"]};

const MAXCHARSSELECT = 3;
const MAXPOWERUPSSELECT = 2;

function GoHome()
{
    location.replace(HOMEPAGE);
}

function GoChooseCharacter()
{
    location.replace(CHARACTERPAGE);
}

function SelectCharacter(charIndex)
{
    console.log("-----------\n", userInfo.charsSelected);
    if (userInfo.charsSelected.includes(charIndex)) DeselectCharacter(charIndex);
    else if (userInfo.charsSelected.length == MAXCHARSSELECT) console.log("Can't add more");
    else userInfo.charsSelected.push(charIndex);
    console.log(userInfo.charsSelected);
}   

function DeselectCharacter(charIndex)
{
    userInfo.charsSelected = userInfo.charsSelected.filter(item => item != charIndex);
}

function ConfirmCharacterSelection()
{
    if (userInfo.charsSelected.length != MAXCHARSSELECT) {console.log("Nop"); return;}

    location.replace(POWERUPPAGE);
}

function SelectPowerup(powerIndex)
{
    console.log(loginDetails);
    console.log(userInfo);
    if (userInfo.powerupsSelected.includes(powerIndex)) DeselectCharacter(powerIndex);
    else if (userInfo.powerupsSelected.length == MAXPOWERUPSSELECT) console.log("Can't add more");
    else userInfo.powerupsSelected.push(powerIndex);
}

function DeselectCharacter(powerIndex)
{
    userInfo.powerupsSelected = userInfo.powerupsSelected.filter(item => item != powerIndex);
}

function ConfirmPowerupSelection()
{
    if (userInfo.powerupsSelected.length != MAXPOWERUPSSELECT) {console.log("Nop"); return;}

    location.replace(GAMEPAGE);
}