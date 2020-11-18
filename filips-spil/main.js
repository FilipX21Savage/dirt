let canvas = document.querySelector("#canvas"); 
let ctx = canvas.getContext('2d'); 





let dog = new Image(); 
dog.src= 'images/dog.png'; 

let road = new Image(); 
road.src= 'images/road.jpg'

let wall = new Image(); 
wall.src= 'images/vej.png'

let bone = new Image(); 
bone.src= 'images/bone.png'

let goal = new Image(); 
goal.src = 'images/goal.png'


maze = 

[
    [0,1,1,1,1,1,1,1,1,1,1,1,1,3],
    [0,1,0,0,0,0,0,0,0,0,1,1,1,1],
    [0,1,0,1,1,1,0,0,1,0,0,0,0,0],
    [0,1,0,0,1,0,0,1,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,0,0,0,1,1,1],
    [0,1,0,1,0,0,0,1,1,1,0,0,0,1],
    [0,1,0,1,1,1,0,1,0,0,0,0,0,1],
    [4,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,0,0,1,0,0,0,0,0],
    [0,1,1,1,1,1,0,0,1,0,0,0,0,0],
    [0,1,0,0,0,1,0,0,1,0,0,0,0,0],
    [0,1,0,0,0,1,0,0,1,0,0,0,0,0],
    [0,4,0,0,0,1,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,1,2],
]

let tileSize = 50; 

let playerPosition = {x:9, y:9};


// tiles 

let walls = 0; 
let roads = 1;
let dogpimp = 2;
let goals = 3
let bones = 4; 

ctx.drawImage(dog,9*tileSize,9*tileSize,tileSize,tileSize);

function drawMaze(){

    for(let y= 0; y < maze.length; y++){

      for(let x = 0; x < maze[y].length; x++){

        if(maze[y][x] === walls){
            ctx.drawImage(wall,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === roads){
            ctx.drawImage(road,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === dogpimp){
            playerPosition.x = x; 
            playerPosition.y = y; 
            ctx.drawImage(dog,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === goals){
            ctx.drawImage(goal,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === bones){
            ctx.drawImage(bone,x*tileSize,y*tileSize,tileSize,tileSize);
        }

      }
    }
}



canvas.style.display="none"; 

//Timer
let seconds = 1000;
document.querySelector('#time-display').innerText = seconds;
let time;

let mazeName = document.querySelector('#mazename');

//Starter spillet
startgame.addEventListener('click', playgame);
function playgame(){
    //viser spillet
    canvas.style.display = "block";

    //Fjerner knappen
    startgame.style.display ="none";


    //Starter timeren
    time = setInterval(function () {
        seconds -= 1;
        document.querySelector('#time-display').innerText = seconds;
        
        //Time up - dÃ¸d
        if(seconds == 0){
            gameover();
        };
    
    }, 1000);
};



//GAME OVER!
function gameover(){
    canvas.style.display = "none";
    mazeName.innerHTML="Game Over";

    //gameover teksten vises ikke
    let gameover = document.querySelector('#gameover');

    if(seconds == 0 ){
        gameover.innerHTML = "<span>You ran out of time.</span>";
    }; 

    clearInterval(time);    
};






function walk(){

    let gameSound = new Audio('gamesounds/walk.mp3');
    gameSound.play();

}


function isWalkable(targetTile) {
    if (targetTile === bones || targetTile === roads) {
        return true;
    } else {
        return false;
    }
}


let score = 0; 

window.addEventListener('keydown', (e) => {
    let targetTile;
    switch (e.keyCode) {
        case 37: //left
            targetTile = maze[playerPosition.y][playerPosition.x - 1];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y][playerPosition.x - 1] = dogpimp; //players nye position
                maze[playerPosition.y][playerPosition.x] = roads;
                drawMaze();
                walk();
                if (targetTile === bones) {
                    score++;
                    //collect();
                    document.getElementById("boxscore").innerHTML = "Bones: " + score;
                }
            }
            break;
        case 39: //Right
            targetTile = maze[playerPosition.y][playerPosition.x + 1];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y][playerPosition.x + 1] = dogpimp; //players nye position
                maze[playerPosition.y][playerPosition.x] = roads;
                drawMaze();

                walk();
                if (targetTile === bones) {
                    score++;
                    //collect();
                    document.getElementById("boxscore").innerHTML = "Bones: " + score;
                }
            }
            break;
        case 38: //Up
            targetTile = maze[playerPosition.y - 1][playerPosition.x];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y - 1][playerPosition.x] = dogpimp; //players nye position
                maze[playerPosition.y][playerPosition.x] = roads;
                drawMaze();
                walk();
                if (targetTile === bones) {
                    score++;
                    //collect();
                    document.getElementById("boxscore").innerHTML = "Bones: " + score;
                }
            }
            break;
        case 40: //down
            targetTile = maze[playerPosition.y + 1][playerPosition.x];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y + 1][playerPosition.x] = dogpimp; //players nye position
                maze[playerPosition.y][playerPosition.x] = roads;
                drawMaze();
                walk();
                if (targetTile === bones) {
                    score++;
                    //collect();
                    document.getElementById("boxscore").innerHTML = "Bones: " + score;
                }
            }
            break;
    }
    console.log(score);
})


window.addEventListener("load", drawMaze);
