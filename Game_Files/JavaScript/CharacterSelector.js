const GAMEPAGE = "3_selectactive.html";

let charsSelected = [];

const MAXCHARSSELECT = 2;

function SelectCharacter(charIndex)
{
    console.log("-----------\n", charsSelected);
    if (charsSelected.includes(charIndex)) DeselectCharacter(charIndex);
    else if (charsSelected.length != MAXCHARSSELECT) charsSelected.push(charIndex);
    DisplaySelection()
}   

function DisplaySelection()
{   
    let characters = JSON.parse(localStorage.Characters);
    let namesCharsSelected = [];

    charsSelected.forEach(charIndex => {
        namesCharsSelected.push(characters[charIndex - 1].name);
    });

    document.getElementById("SelectionDisplay").innerHTML = "Characters Selected: " + namesCharsSelected;
}

function DeselectCharacter(charIndex)
{
    charsSelected = charsSelected.filter(item => item != charIndex);
}

function ConfirmCharacterSelection()
{
    if (charsSelected.length != MAXCHARSSELECT) {console.log("Nop"); return;}
    
    let charObjs = [];
    let characters = JSON.parse(localStorage.Characters);
    charsSelected.forEach(charIndex => {
        charObjs.push(characters[charIndex - 1]);
    });
    sessionStorage.Characters = JSON.stringify(charObjs);

    location.replace(GAMEPAGE);
}
