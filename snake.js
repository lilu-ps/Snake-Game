import * as CONSTANTS from "./config.js";

export class Snake{
    constructor(elem) {
        this.elem = elem;
        this.lastDirection = CONSTANTS.RIGHT_DIRECTION;
        this.snakeLength = CONSTANTS.SNAKE_DEFAULT_LENGTH;
    }


    async getSnakeElem(){
        return this.elem;
    }


    async move(){
        switch(this.lastDirection){
            case CONSTANTS.RIGHT_DIRECTION:
                this._moveHorizontal(1, this.elem);
                break;
            case CONSTANTS.LEFT_DIRECTION:
                this._moveHorizontal(-1, this.elem);
                break;
            case CONSTANTS.DOWN_DIRECTION:
                this._moveVertical(1, this.elem);
                break;
            case CONSTANTS.UP_DIRECTION:
                this._moveVertical(-1,this.elem);
                break;
        }
    }
    
    /*
     * Moves in horizontal direction. If direction equals -1, the snake moves
     * left, if direction equals 1, then it moves right.
    */
    async _moveHorizontal(direction, elem){
        if (direction == 1 && elem.offsetLeft + CONSTANTS.RECT_WIDTH == CONSTANTS.CANVAS_WIDTH) return;
        if (direction == -1 && elem.offsetLeft == 0) return;

        elem.style.left=elem.offsetLeft + (direction * CONSTANTS.RECT_WIDTH) + 'px';
    }
    
    /*
     * Moves in vertical direction. If direction equals -1, the snake moves
     * up, if direction equals 1, then it moves down.
    */
    async _moveVertical(direction, elem){
        if (direction == 1 && elem.offsetTop + CONSTANTS.RECT_HEIGHT == CONSTANTS.CANVAS_HEIGHT) return;
        if (direction == -1 && elem.offsetTop == 0) return;

        elem.style.top=elem.offsetTop + (direction * CONSTANTS.RECT_HEIGHT) + 'px';
    }
    
    
    /*
     * Changes direction by assiging last direction to left, right, down or up 
     * direction constants.
     */
    async changeDirection(key_code){
        switch(key_code){
            case CONSTANTS.LEFT_CODE:
                this.lastDirection = CONSTANTS.LEFT_DIRECTION;
                break;
            case CONSTANTS.UP_CODE:
                this.lastDirection = CONSTANTS.UP_DIRECTION;
                break;
            case CONSTANTS.RIGHT_CODE:
                this.lastDirection = CONSTANTS.RIGHT_DIRECTION;
                break;
            case CONSTANTS.DOWN_CODE:
                this.lastDirection = CONSTANTS.DOWN_DIRECTION;
                break;
        }
    }
    
    
}