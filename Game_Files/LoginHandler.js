let homePage = "index.html";
let characterPage = "choosechar.html";
let powerUpPage = "choosepowerup.html";
let userInfo = {loggedIn: false, playerName : "", charsSelected: [], powerupsSelected: []};
let loginDetails = {usernames: ["abc"], passwords: ["123"]};

function GoLogin()
{
    location.replace("index.html");
}

function GoHome()
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
    let usernameIndex = loginDetails.usernames.findIndex(element => (element = username))
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

function CheckSpecialChars(inputString)
{
    let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
    return specialChars.test(inputString); //Regex (regular expressions) function string.test to check if special character in string
}

function CheckEmptyField(email, username, dob, password, confPassword)
{
    if (email == "" || username == "" || dob == "" || password == "" || confPassword == "") return true;
    return false;
}

function CheckRegistration(email, username, dob, password, confPassword)
{
    /*
        Parameters:
            1. email: str (user input for email)
            2. username: str (user input for username)
            3. dob: str (user input for dob)
            4. password: str (user input for password)
            5. confPassword: str (user input for confPassword)

        Returns: 
            True + errorMsg: if all checks were clear
            False + errorMsg: str if even one check doesn't clear
    */
    let errorMsg = "";
    let dobSplit = dob.split("-");
    console.log(dob);
    dateOfBirth = Date.parse(dob);
    console.log(dateOfBirth);
    const CURDATE = new Date;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    confPassword = confPassword.trim();
    if (CheckEmptyField(email, username, dob, password, confPassword)) return false, "Fill all empty fields";
    const LOGINCONDITIONS = 
    {
        "Email should include \".\"": email.includes("."),
        "Email should include \"@\"": email.includes("@"),
        "Email cannot include space": !email.includes(" "),
        "Email cannot be longer than 64 characters in total": email.length < 64,
        "Username cannot include special characters": !CheckSpecialChars(username), 
        "Username cannot be longer than 16 characters": username.length < 17,
        "You must be at least 5 years old": (CURDATE - dateOfBirth) / (1000 * 60 * 60 * 24 * 365) >= 5,
        "Password must be at least 8 characters": password.length >= 8,
        "Password must contain at least one special character": CheckSpecialChars(password),
        "Password must contain at least one capital letter": /[A-Z]/.test(password),
        "Password must contain at least one small letter": /[a-z]/.test(password),
        "Password cannot be more than 16 characters": password.length < 17,
        "Confirm password should be the same value as password": confPassword == password
    }

    for(let message in LOGINCONDITIONS) {
        if (!LOGINCONDITIONS[message]) errorMsg += message;
    }

    
    if (errorMsg != "") return false, errorMsg;

    return true;
}

function Register()
{
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("confPassword").value;
    console.log(CheckRegistration(email, username, dob, password, confPassword));
    //Register user
    //GoLogin();
}

function GoChooseCharacter()
{
    location.replace(characterPage);
}
