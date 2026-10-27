import { CardHTML } from "./modules/DisplayCard";

let canvas;
let context;

window.onload = Init;
function Init()
{
    canvas = document.getElementById("GameCanvas");
    context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    context.moveTo(0, 0);
    context.lineTo(200, 200);
    context.stroke();

    context.beginPath();
    context.arc(200, 200, 100, 0, 360, false);
    context.stroke();

    context.fillstyle = "red";
    context.fillRect(0, 0, 100, 100);
}
