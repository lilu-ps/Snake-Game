import * as CONSTANTS from "./config.js";
import { Snake } from "./snake.js";
let snake = new Snake();
let intervalId;

window.onload = function(){
    createButtons();
    init();
};  

function init(){
    snake.initSnakeBody();

    snake.drawSnake();
    snake.drawFood();
    createScore();
}

/*
 * Creates a score div with default inner html of "score: 0".
 * score will change when the snakes eats food.
 */
function createScore(){
    let score = document.createElement('div');
    score.setAttribute('id', 'score-id');
    score.setAttribute('class', 'score');

    score.style.backgroundColor= "white";
    score.innerHTML = "SCORE: 0";
    document.getElementById('canvas-id').append(score);
}

function play(){
    intervalId = setInterval(function(){
        if (moveSnakes() == -1)  {
            stop();
        }

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
       if (snake.move(document.getElementById(i), i) == -1){
           return -1;
       }
    }
    return 0;
}


/*
 * Creates three general buttons: play, pause and stop
 */
function createButtons(){
    addButtton("PLAY");
    addButtton("PAUSE");
    addButtton("STOP");
}

/*
 * General function for creating and adding new button.
 * Adds listeners to the new button with a function suitable
 * for buttons name.
 */
function addButtton(filterKey){
    let butt = document.createElement("BUTTON");
    butt.innerHTML = filterKey;
    butt.setAttribute('class', 'game-button');

    butt.style.marginRight = "6px";
    butt.value = filterKey;
    butt.setAttribute('id', filterKey);
    butt.addEventListener("click",function(){
        switch(filterKey){
            case "PLAY":
                play();
                break;
            case "PAUSE":
                pause();
                break;
            case "STOP":
                stop();
                break;
        }
    }, false);
    document.getElementById("button-list").append(butt);
}

// Puases the game
function pause(){
    clearInterval(intervalId);
}
/*
 * Stops the game, clears entire canvas and re-initializes the snake
 */
function stop(){
    pause();
    snake.clearEverything();
    init();
}

