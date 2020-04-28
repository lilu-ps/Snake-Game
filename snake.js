import * as CONSTANTS from "./config.js";

export class Snake{
    constructor() {
        this.lastDirection = CONSTANTS.RIGHT_DIRECTION;

        this.snakeLength = CONSTANTS.SNAKE_DEFAULT_LENGTH;
        this.snakeBody = [];
        this.a = 5;
        this.prev = {x:0, y:0};
    }

    getLastDirection(){
        return this.lastDirection;
    }


    getSnakeElem(){
        return this.elem;
    }

    getSnakeBody(){
        return this.snakeBody;
    }

    getA(){
        return this.a;
    }

    getSnakeLength(){
        return (this.snakeLength);
    }

    setSnakeLength(newLength){
        this.snakeLength = newLength;
    }

    initSnakeBody(){
        for (var i = this.snakeLength - 1; i >= 0; i--){
            var dict = {x: i, y: 0};
            this.snakeBody.push(dict);
        }
    }

    move(elem, index){
        let x = this.prev.x;
        let y = this.prev.y;

        this.prev.x = this.snakeBody[index].x;
        this.prev.y = this.snakeBody[index].y;
        if (index == 0){
           this.moveSnakeHead(elem);
        } else {
            this.snakeBody[index].x = x;
            this.snakeBody[index].y = y;
        }
        elem.style.left = this.snakeBody[index].x * CONSTANTS.RECT_WIDTH + 'px';
        elem.style.top = this.snakeBody[index].y * CONSTANTS.RECT_WIDTH + 'px';
        
    }
 

    moveSnakeHead(elem){
        switch(this.lastDirection){
            case CONSTANTS.RIGHT_DIRECTION:
                this._moveHorizontal(1, elem);
                break;
            case CONSTANTS.LEFT_DIRECTION:
                this._moveHorizontal(-1, elem);
                break;
            case CONSTANTS.DOWN_DIRECTION:
                this._moveVertical(1, elem);
                break;
            case CONSTANTS.UP_DIRECTION:
                this._moveVertical(-1, elem);
                break;
        }
    }


    /*
     * Moves in horizontal direction. If direction equals -1, the snake moves
     * left, if direction equals 1, then it moves right.
    */
    _moveHorizontal(direction, elem){
        if (direction == 1 && elem.offsetLeft + CONSTANTS.RECT_WIDTH == CONSTANTS.CANVAS_WIDTH) return;
        if (direction == -1 && elem.offsetLeft == 0) return;

        this.snakeBody[0].x += direction;
    }

    /*
     * Moves in vertical direction. If direction equals -1, the snake moves
     * up, if direction equals 1, then it moves down.
    */
    _moveVertical(direction, elem){
        if (direction == 1 && elem.offsetTop + CONSTANTS.RECT_HEIGHT == CONSTANTS.CANVAS_HEIGHT) return;
        if (direction == -1 && elem.offsetTop == 0) return;

        //elem.style.top=elem.offsetTop + (direction * CONSTANTS.RECT_HEIGHT) + 'px';
        this.snakeBody[0].y += direction;
    }


    /*
     * Changes direction by assiging last direction to left, right, down or up
     * direction constants.
     */
    changeDirection(key_code){
        switch(key_code){
            case CONSTANTS.LEFT_CODE:
                if (this.lastDirection != CONSTANTS.RIGHT_DIRECTION)
                    this.lastDirection = CONSTANTS.LEFT_DIRECTION;
                break;
            case CONSTANTS.UP_CODE:
                if (this.lastDirection != CONSTANTS.DOWN_DIRECTION)
                    this.lastDirection = CONSTANTS.UP_DIRECTION;
                break;
            case CONSTANTS.RIGHT_CODE:
                if (this.lastDirection != CONSTANTS.LEFT_DIRECTION)
                    this.lastDirection = CONSTANTS.RIGHT_DIRECTION;
                break;
            case CONSTANTS.DOWN_CODE:   
                if (this.lastDirection != CONSTANTS.UP_DIRECTION)
                    this.lastDirection = CONSTANTS.DOWN_DIRECTION;
                break;
        }
    }


}