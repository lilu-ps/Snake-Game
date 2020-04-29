import * as CONSTANTS from "./config.js";

export class Snake{
    constructor() {
        this.defaultInit();
    }

    /*
     * Initialize everthing to default
    */
    defaultInit(){
        this.lastDirection = CONSTANTS.RIGHT_DIRECTION;

        this.snakeLength = CONSTANTS.SNAKE_DEFAULT_LENGTH;
        this.snakeBody = [];
        this.a = 5;
        this.prev = {x:0, y:0};
        this.food = {x:0, y:0};
    }
    
    /*
     * Removes snakes current body and food from canvas.
     * Also re-initializes everything to default.
     */
    clearEverything(){
        for(var i = 0; i < this.snakeLength; i++){
            let curPart = document.getElementById(i);
            curPart.parentNode.removeChild(curPart);
        }
        let curPart = document.getElementById("food-id");
        curPart.parentNode.removeChild(curPart);
        this.defaultInit();
    }
    /*
     * Returns snake length
     */
    getSnakeLength(){
        return this.snakeLength;
    }

    /*
     * Initializes array for snake body, giving every part of it
     * default coordinates
     */
    initSnakeBody(){
        for (var i = this.snakeLength - 1; i >= 0; i--){
            var dict = {x: i, y: 0};
            this.snakeBody.push(dict);
        }
    }

    /*
     * Draws entire snake
     */
    drawSnake(){
        let arr = this.snakeBody;
        for (var i = 0; i < this.getSnakeLength(); i++){
            this._createRect(i, arr[i].x, arr[i].y);
    
        }   
    }

    /*
     * This function chooses random coordinates for food and 
     * then draws it on canvas.
     */
    drawFood(){
        this.food.x = Math.round(Math.random()*(CONSTANTS.CANVAS_WIDTH-CONSTANTS.RECT_WIDTH)/CONSTANTS.RECT_WIDTH);
        this.food.y = Math.round(Math.random()*(CONSTANTS.CANVAS_HEIGHT-CONSTANTS.RECT_HEIGHT)/CONSTANTS.RECT_HEIGHT);

        let foodRect = this._createRect('food-id', this.food.x, this.food.y);
        foodRect.style.backgroundColor = "red";
        foodRect.style.borderColor = "#DF868F";
    }
    
    
    /*
     * Creates a single rect at given position (x, y) with given rectId
     */
    _createRect(rectId, x, y){
        let curRect = document.createElement('div');
    
        curRect.setAttribute('id', rectId);
        curRect.setAttribute('class', 'rect');
    
        curRect.style.left = CONSTANTS.RECT_WIDTH * x + 'px';
        curRect.style.top = y * CONSTANTS.RECT_HEIGHT + 'px';
    
        document.getElementById("canvas-id").append(curRect);
        return curRect;
    }

    /*
     * This function moves the snake: if the element is the head of the snake,
     * moveSnakeHead function is called, if not, the current element takes place of
     * it's previous one.
     */
    move(elem, index){
        let x = this.prev.x;
        let y = this.prev.y;

        this.prev.x = this.snakeBody[index].x;
        this.prev.y = this.snakeBody[index].y;
        if (index == 0){
           if (this._moveSnakeHead(elem) == -1) return -1;
           if (this.snakeBody[index].x == this.food.x && this.snakeBody[index].y == this.food.y){
                this._eatAndGrow()
           }
        } else {
            this.snakeBody[index].x = x;
            this.snakeBody[index].y = y;
        }
        elem.style.left = this.snakeBody[index].x * CONSTANTS.RECT_WIDTH + 'px';
        elem.style.top = this.snakeBody[index].y * CONSTANTS.RECT_WIDTH + 'px';
        return 0;
    }

    /*
     * If snake finds food, the said food is removed, new one is created
     * and another rect is added to snake's tail.
     */
    _eatAndGrow(){
        var curFood = document.getElementById('food-id');
        curFood.parentNode.removeChild(curFood);

        this.drawFood();
        let length = this.snakeLength;
        this.snakeBody.push({x: this.snakeBody[length - 1].x, y: this.snakeBody[length - 1].y});
        this._createRect(length, this.snakeBody[length].x, this.snakeBody[length].y);
        this.snakeLength++;
    }
 

    /*
     * Checks what the previos direction was for the snake and acts according to that.
     */
    _moveSnakeHead(elem){
        switch(this.lastDirection){
            case CONSTANTS.RIGHT_DIRECTION:
                return this._moveHorizontal(1, elem);
            case CONSTANTS.LEFT_DIRECTION:
                return this._moveHorizontal(-1, elem);
            case CONSTANTS.DOWN_DIRECTION:
                return this._moveVertical(1, elem);
            case CONSTANTS.UP_DIRECTION:
                return this._moveVertical(-1, elem);
        }
        return 0;
    }


    /*
     * Moves in horizontal direction. If direction equals -1, the snake moves
     * left, if direction equals 1, then it moves right.
    */
    _moveHorizontal(direction, elem){
        if (direction == 1 && elem.offsetLeft + CONSTANTS.RECT_WIDTH == CONSTANTS.CANVAS_WIDTH) {
            return -1;
        }
        if (direction == -1 && elem.offsetLeft == 0) {
            return -1;
        }

        this.snakeBody[0].x += direction;
    }

    /*
     * Moves in vertical direction. If direction equals -1, the snake moves
     * up, if direction equals 1, then it moves down.
    */
    _moveVertical(direction, elem){
        if (direction == 1 && elem.offsetTop + CONSTANTS.RECT_HEIGHT == CONSTANTS.CANVAS_HEIGHT) {
            return -1;
        }
        if (direction == -1 && elem.offsetTop == 0) {
            return -1;
        }

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