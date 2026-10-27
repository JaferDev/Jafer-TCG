const HOME = "../index.html";
const REGISTER = "1_register.html";
const CHOOSECHAR = "2_choosechar.html";
const SELECTACTIVE = "3_selectactive.html";
const PICKENERGY = "4_pickenergy.html";
const MAINGAME = "5_game.html";
const HIGHSCORES = "HTMLPages/6_highscores.html";

function ChangePage(pageNum)
{
    switch (pageNum)
    {
        case 0:
            location.replace(HOME);
            break;
        case 1:
            location.replace(REGISTER);
            break;
        case 2:
            location.replace(CHOOSECHAR);
            break;
        case 3:
            location.replace(SELECTACTIVE);
            break;
        case 4:
            location.replace(PICKENERGY);
            break;
        case 5:
            location.replace(MAINGAME);
            break;
        case 6:
            location.replace(HIGHSCORES);
            break;
        default:
            location.replace(HOME);
            break;
    }
}