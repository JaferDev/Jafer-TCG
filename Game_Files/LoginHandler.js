let characterPage = "choosechar.html";
let powerUpPage = "choosepowerup.html";
let userInfo = {loggedIn: false, playerName : "", charsSelected: [], powerupsSelected: []};
let loginDetails = {usernames: ["abc"], passwords: ["123"]};

function ConfirmLogin()
{
    //Login Validation
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;
    const guestName = document.getElementById("guestNickname").value;

    if ((loginUsername == "" && loginPassword == "") && (guestName != "")) GuestEnter(guestName);
    else LoggedInEnter(loginUsername, loginPassword);
}

function GuestEnter(guestName)
{
    sessionStorage.guestName = guestName;
    sessionStorage.loggedIn = undefined;
    GoChooseCharacter();
}

function LoggedInEnter(username, password)
{   
    let userData = localStorage[username];
    if (userData == undefined) { UserNotFound(); return; }

    let userObj = JSON.parse(userData);
    console.log(password, userObj.password);
    if (password == userObj.password) LoginSuccess();
    else PasswordIncorrect();
}

function LoginSuccess(username)
{
    sessionStorage[username] = username;
    GoChooseCharacter();
}

function UserNotFound()
{
    document.getElementById("ErrorMessage").innerHTML = "User Not Found, you may want to register";
}

function PasswordIncorrect()
{
    document.getElementById("ErrorMessage").innerHTML = "Password Incorrect";
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