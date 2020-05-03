import * as CONSTANTS from "./config.js";
import { Snake } from "./snake.js";
let snake = new Snake();
let intervalId;
let prevButton;

window.onload = function(){
    createButtons();
    init(CONSTANTS.START_STRING);
};  

/*
 * Initializes the entire game
 */
function init(messageStr){
    snake.initSnakeBody();
    createScore();

    snake.drawSnake();
    snake.drawFood();

    document.getElementById('message-list').innerHTML = messageStr;
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
    score.innerHTML = "SCORE: " + snake.getScore();
    document.getElementById('canvas-id').append(score);
}

/*
 * This function is called when the play button is clicked
 */
function play(){
    if (prevButton == CONSTANTS.PLAY_BUTTON) return;

    document.getElementById('message-list').innerHTML = "";
    prevButton = CONSTANTS.PLAY_BUTTON;

    intervalId = setInterval(function(){
        if (moveSnakes() == -1)  {
            stop();
        }

     }, 100);
}

onkeydown = changeSnakeDirection;

/*
 * When the playes presses one of the arrow keys,
 * this function will be called, which will change
 * the snake direction accordingly.
 */
function changeSnakeDirection(e){
    var key_code=e.which||e.keyCode;
    snake.changeDirection(key_code);
}


/*
 * This function moves every part of the snake body
 */
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
    if (prevButton == CONSTANTS.PAUSE_BUTTON) return;
    clearInterval(intervalId);
    document.getElementById('message-list').innerHTML = CONSTANTS.PAUSE_STRING;
    prevButton = CONSTANTS.PAUSE_BUTTON;
}
/*
 * Stops the game, clears entire canvas and re-initializes the snake
 */
function stop(){
    if (prevButton == CONSTANTS.STOP_BUTTON) return;

    pause();
    snake.clearEverything();
    init(CONSTANTS.STOP_STRING);
    prevButton = CONSTANTS.STOP_BUTTON;
}

