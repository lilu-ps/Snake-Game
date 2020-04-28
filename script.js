import * as CONSTANTS from "./config.js";
import { Snake } from "./snake.js";
let snake ;

window.onload = init();

function init(){
    snake = new Snake();
    snake.initSnakeBody();

    snake.drawSnake();
    snake.drawFood();
    setInterval(function(){
        moveSnakes();
     }, 100);
}

onkeydown = changeSnakeDirection;

function changeSnakeDirection(e){
    var key_code=e.which||e.keyCode;
    snake.changeDirection(key_code);
}


function moveSnakes(){
    let length = snake.getSnakeLength();
    for (var i = 0; i < length; i++){
       snake.move(document.getElementById(i), i);
    }
}

