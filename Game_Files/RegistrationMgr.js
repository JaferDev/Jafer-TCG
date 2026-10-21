const homePage = "index.html";

class User
{
    constructor(email, username, dateOfBirth, password)
    {
        this.email = email;
        this.username = username;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
    }
}

function GoHome()
{
    location.replace(homePage);
}

function Register()
{
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("confPassword").value;

    let regVerified = CheckRegistration(email, username, dob, password, confPassword);
    console.log(regVerified[0]);

    if (!regVerified[0]) { DisplayErrorMsg(regVerified[1]); return; }

    AddToStorage(email, username, dob, password, confPassword);

    GoHome();
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
    /**
     * Checks if user input passes all checks. 
     * If any condition fails, [false, errorMsg] is returned
     * If all conditions pass, [true, ""] is returned
     * @param {string} email - User input for email
     * @param {string} username - User input for username
     * @param {string} dob - User input for date of birth
     * @param {string} password - User input for password
     * @param {string} confPassword - User input for confirm password
     */

    let errorMsg = "";

    //Converting dates from string to Date datatype
    dateOfBirth = Date.parse(dob);
    const CURDATE = new Date;

    //Initial check
    if (CheckEmptyField(email, username, dob, password, confPassword)) return [false, "<br>Fill all empty fields"];

    //Dictionary[str, bool] . Key is error message, value is condition required to fail to raise error message
    const LOGINCONDITIONS = {
        "Email should include \".\"": email.includes("."),
        "Email should include \"@\"": email.includes("@"),
        "Email cannot include space": !email.includes(" "),
        "Email cannot be longer than 64 characters in total": email.length < 64,
        "Username cannot include special characters": !CheckSpecialChars(username), 
        "Username cannot be longer than 16 characters": username.length < 17,
        "Username must at least be 5 characters": username.length > 4,
        "You must be at least 5 years old": (CURDATE - dateOfBirth) / (1000 * 60 * 60 * 24 * 365) >= 5,
        "Password must be at least 8 characters": password.length >= 8,
        "Password must contain at least one special character": CheckSpecialChars(password),
        "Password must contain at least one capital letter": /[A-Z]/.test(password),
        "Password must contain at least one small letter": /[a-z]/.test(password),
        "Password cannot be more than 16 characters": password.length < 17,
        "Confirm password should be the same value as password": confPassword == password
    }

    let i = 1;
    for(let message in LOGINCONDITIONS) {if (!LOGINCONDITIONS[message]) { errorMsg += "<br>"+ i + ". " + message; i++; }}
    if (errorMsg != "") return [false, errorMsg];

    return [true, ""];
}

function DisplayErrorMsg(errorMsg)
{
    document.getElementById("ScrollableText").innerHTML = "<div class=\"ScrollableText\">" + errorMsg.substring(4) + "</div>";
}

function AddToStorage(email, username, dob, password)
{
    let newUser = new User(email, username, dob, password);
    localStorage[newUser.username] = JSON.stringify(newUser);
}