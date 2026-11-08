window.onload = Init;

function Init()
{
    ShowPageHead();
    DisplayResults();
}

function ShowPageHead()
{
    const pageHead = document.getElementById("PageHead");
    const subheading = document.getElementById("Subheading");
    const winner = JSON.parse(sessionStorage.Winner);
    
    if (winner == "Player") { pageHead.innerHTML = "YOU WON!!!"; subheading.innerHTML = "WOOHOOO!!!!";}
    else { pageHead.innerHTML = "You Lost LLL"; subheading.innerHTML = "Womp womp"; }
}

function DisplayResults()
{
    let playerName;
    if (JSON.parse(sessionStorage.loggedIn)) playerName = JSON.parse(sessionStorage.username);
    else playerName = JSON.parse(sessionStorage.guestName);

    const playerCharacters = JSON.parse(sessionStorage.Characters);
    const enemyCharacters = JSON.parse(sessionStorage.enemyCharacters);
    const turn = JSON.parse(sessionStorage.turn);
    const data = [playerName, GetCharacterNames(playerCharacters), GetCharacterNames(enemyCharacters), turn];

    //Gets elements in order of [name, player characters, enemy characters, rounds lasted]
    let elements = document.getElementsByClassName("ResultsData");
    for(let i = 0; i < elements.length; i++)
    {
        elements[i].innerHTML = data[i];
    }
}

function GetCharacterNames(characters)
{
    let names = [];
    characters.forEach(character => {names.push(character.name);}); 
    return names;
}