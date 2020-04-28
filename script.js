import * as CONSTANTS from "./config.js";
import { Snake } from "./snake.js";
let snake ;

// init();

window.onload = init();

function init(){
    drawSnake();
    setInterval(function(){
        moveSnakes();
     }, 100);
}

onkeydown = changeSnakeDirection;

function changeSnakeDirection(e){
    var key_code=e.which||e.keyCode;
    snake.changeDirection(key_code);
}


function drawSnake(){
    snake = new Snake();
    snake.initSnakeBody();
    let arr = snake.getSnakeBody();
    let length = snake.getSnakeLength();
    for (var i = 0; i < length; i++){
        let curRect = document.createElement('div');
        curRect.setAttribute('id', i);
        curRect.setAttribute('class', 'rect');
        curRect.style.left = CONSTANTS.RECT_WIDTH * arr[i].x + 'px';
        curRect.style.top = arr[i].y * CONSTANTS.RECT_HEIGHT + 'px';
        document.getElementById("canvas-id").append(curRect);

    }
     
}

function moveSnakes(){
    let length = snake.getSnakeLength();
    for (var i = 0; i < length; i++){
       snake.move(document.getElementById(i), i);
    }
}

