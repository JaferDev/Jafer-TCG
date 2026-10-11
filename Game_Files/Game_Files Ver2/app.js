let homePage = "index.html";
let characterPage = "choosecharacter.html";

function GoLogin()
{
    location.replace("index.html");
}

function ConfirmLogin()
{
    //If confirmed
    console.log("Confirmed");
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