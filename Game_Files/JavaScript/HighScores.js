import { User } from "./modules/GameData.js";

window.onload = Init;

class HighScore
{
    /**
     * 
     * @param {number} score 
     * @param {string} name 
     */
    constructor(score, name)
    {
        this.score = score;
        this.name = name;
    }
}

function Init()
{
    let tableBody = document.getElementById("TableBody");

    let rank = 1;

    GetHighScores(JSON.parse(localStorage.Users)).forEach(user => {
        if (rank == 5) return;
        row = tableBody.insertRow();
        row.insertCell(0).innerHTML = rank;
        row.insertCell(1).innerHTML = user.highScore;
        row.insertCell(2).innerHTML = user.username;
        rank++;
    })

    if (rank < 5) FillRest(rank, tableBody) 
}

function FillRest(rank, tableBody)
{
    for (let i = rank; i <= 5; i++) 
    {
        let row = tableBody.insertRow();
        row.insertCell(0).innerHTML = "---";
        row.insertCell(1).innerHTML = "---";
        row.insertCell(2).innerHTML = "---";
    }
}

function GetHighScores(users)
{
    let sortedUsers = [];

    for (let i = 5; i < 5; i++)
    {
        let maxUser = users[0];
        users.forEach(user =>{
            if (user.highScore > maxUser.highScore) maxUser = user;
        })

        sortedUsers.push(maxUser);
        users = users.filter(user => {user != maxUser});
    }

    return sortedUsers;
}