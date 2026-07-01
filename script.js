//Define The HTML elements/logic of the game
const board = document.getElementById('game-board');

//Define game variables
const gridsize = 20;
let snake = [{x : 10,y:10}];
let food = generateFood();
let direction = 'left';
let gameInterval;
gameSpeedDelay = 200; //delay in milliseconds

//Draw game map snake and food
function draw(){
board.innerHTML = '';
drawSnake();
drawFood();
}

//Draw snake 
function drawSnake(){
snake.forEach((segment) => {
const snakeElement = createGameElement('div','snake');
setPosition(snakeElement,segment);
board.appendChild(snakeElement);
});

}

//Create a snake (cube)

function createGameElement(tag,className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//set the position of the snake or food

function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}
//draw function 
draw();

//Draw food function
function drawFood(){
const foodElement = createGameElement('div','food');
setPosition(foodElement, food);
board.appendChild(foodElement);
}
//Generate food
function generateFood(){
    const x = Math.floor(Math.random() * gridsize) + 1;
    const y = Math.floor(Math.random() * gridsize) + 1;
    return {x, y};
}
//Funtion for moving the snake
function move(){
    const head = {...snake[0]};
    switch(direction){
        case 'right':
            head.x ++;
            break;
        case 'left':
            head.x --;
            break;
        case 'up':
            head.y --;
            break;
        case 'down':
            head.y ++;
            break;
    }
    snake.unshift(head);
    // snake.pop();
    if (head.x === food.x && head.y === food.y){
        food = generateFood();
        clearInterval();//clear past interval 
        gameInterval = setInterval(() => {
            move();
            draw();
        },gameSpeedDelay);
}else{
    snake.pop();
    }
}




//Tet Moving

// setInterval(() => {
//     move(); //move the snake
//     draw(); //draw the snake and food
// },200); //move the snake every 200 milliseconds