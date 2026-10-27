import { User } from "./modules/GameData";

window.onload = Init;

class HighScore
{
    /**
     * 
     * @param {number} score 
     * @param {string} name 
     */
    constructor(rank, score, name)
    {
        this.score = score;
        this.name = name;
    }
}

function Init()
{
    let highScores = []; //Array[HighScore]
    GetHighScores();
    let table = document.getElementById("HighScoreTable");
}

function GetHighScores()
{
    
}