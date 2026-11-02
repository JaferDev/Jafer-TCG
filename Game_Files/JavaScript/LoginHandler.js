window.ConfirmLogin = ConfirmLogin;
let characterPage = "HTMLPages/2_choosechar.html";
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
    if ((localStorage.getItem(username)) === null) { RaiseError("User Not Found"); return; }
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

function GoChooseCharacter()
{
    location.replace(characterPage);
}