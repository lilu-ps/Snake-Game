import * as CONSTANTS from "./config.js";
import { Snake } from "./snake.js";

let snake = new Snake(document.getElementById("rect"));

window.onload = setInterval(function(){
    snake.move();
}, 100);

onkeydown = changeSnakeDirection;

function changeSnakeDirection(e){
    var key_code=e.which||e.keyCode;
    console.log(key_code);
    snake.changeDirection(key_code);
}
