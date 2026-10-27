let characterPage = "HTMLPages/2_choosechar.html";
let userInfo = {loggedIn: false, playerName : "", charsSelected: [], powerupsSelected: []};
let loginDetails = {usernames: ["abc"], passwords: ["123"]};

function ConfirmLogin()
{
    //Login Validation
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;
    const guestName = document.getElementById("guestNickname").value;

    console.log(loginPassword);
    if ((loginUsername == "" && loginPassword == "") && (guestName != "")) GuestEnter(guestName);
    else if((loginUsername != "" || loginPassword == "") && (guestName != "")) RaiseError("Pick between login or guest");
    else LoggedInEnter(loginUsername, loginPassword);
}

function GuestEnter(guestName)
{
    sessionStorage.guestName = JSON.stringify(guestName);
    sessionStorage.loggedIn = JSON.stringify(false);
    GoChooseCharacter();
}

function LoggedInEnter(username, password)
{   
    let userData = JSON.parse(localStorage[username]);
    if (!userData) { RaiseError("User Not Found, you may want to register"); return; }

    if (password == userData.password) LoginSuccess(username);
    else RaiseError("Password Incorrect");
}

function LoginSuccess(username)
{
    sessionStorage.username = JSON.stringify(username);
    sessionStorage.loggedIn = JSON.stringify(true);
    GoChooseCharacter();
}

function RaiseError(errorMsg)
{
    document.getElementById("ErrorMessage").innerHTML = errorMsg;
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
    return (loginUsername == "" && loginPassword == "") && (guestName != "");
}

function GoChooseCharacter()
{
    location.replace(characterPage);
}