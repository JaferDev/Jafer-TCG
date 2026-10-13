let homePage = "index.html";
let characterPage = "choosechar.html";
let powerUpPage = "choosepowerup.html";
let userInfo = {loggedIn: false, playerName : "", charsSelected: [], powerupsSelected: []};
let loginDetails = {usernames: ["abc"], passwords: ["123"]};

function GoLogin()
{
    location.replace("index.html");
}

function FindIndex(item, array)
{
    for(let i = 0; i < array.length; i++) if (array[i] == item) return i;
    
    return -1;
}

function LoginFail()
{
    console.log("LOGIN FAIL");
}

function IsGuest(loginUsername, loginPassword, guestName)
{
    if ((loginUsername == "" && loginPassword == "") && (guestName != "")) return false;
    
    return true;
}

function GuestEnter(guestName)
{
    userInfo.loggedIn = false;
    userInfo.playerName = guestName;
    GoChooseCharacter();
}

function LoggedInEnter(username, password)
{
    let usernameIndex = FindIndex(username, loginDetails.usernames);
    if (usernameIndex == -1) {LoginFail(); return;}
    
    if (password != loginDetails.passwords[usernameIndex]) {LoginFail(); return;}

    userInfo.loggedIn = true;
    userInfo.playerName = username;
}

function ConfirmLogin()
{
    //Login Validation
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;
    const guestName = document.getElementById("guestNickname").value;

    if (IsGuest(loginUsername, loginPassword, guestName)) GuestEnter(guestName);
    else LoggedInEnter(loginUsername, loginPassword);

    GoChooseCharacter();
}



function Register()
{
    //Register user
    GoLogin();
    console.log("Confirmed");
}

function GoChooseCharacter()
{
    location.replace(characterPage);
}

function SelectCharacter(charIndex)
{
    console.log(loginDetails);
    console.log(userInfo);
    if (userInfo.charsSelected.includes(charIndex)) DeselectCharacter(charIndex);
    else if (userInfo.charsSelected.length == 3) console.log("Can't add more");
    else userInfo.charsSelected.push(charIndex);

    console.log(userInfo.charsSelected);
}

function DeselectCharacter(charIndex)
{
    console.log("Before Deselection: " + userInfo.charsSelected);
    userInfo.charsSelected = userInfo.charsSelected.filter(item => item != charIndex);
    console.log("After Deselection: " + userInfo.charsSelected);
}

function ConfirmCharacterSelection()
{
    if (userInfo.charsSelected.length != 3) {console.log("Nop"); return;}

    location.replace(powerUpPage);
}