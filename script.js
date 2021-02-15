const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
const canvasText = document.getElementById("gameMenu");
const canvasStats = document.getElementById("gameStats");
const ctx = canvas.getContext('2d');
const ctxT = canvasText.getContext('2d');
const ctxS = canvasStats.getContext('2d');
const carImg = document.getElementById('car');
const rivalImg = document.getElementById('rival');
const rivalImg2= document.getElementById('rival2');
const rivalImg3 = document.getElementById('rival3');
const rivalImg4 = document.getElementById('bike');
const holeImg = document.getElementById('hole');
const titoImg = document.getElementById('tito');
const titoImg2 = document.getElementById('tito2');
const boomImg = document.getElementById('boom');
var myMusic= document.getElementById("music");

let iter = 0;
let score = 0;
let maxScore = 0;
let dead = false;
let level = 0;
let rivals = new Array();
let rivalsSpeed = 2;
let middleLines = new Array();
const lane = [10, 55, 110, 155];



/**************************************************************************************************************************/
/* player's car */

const car = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 70,
    w: 40,
    h: 70,
    speed: 3,
    dx: 0,
    dy: 0,
};

function drawCar(){ 
    ctx.drawImage(carImg, car.x, car.y, car.w, car.h);
}

function moveCar(){

    car.x += car.dx;
    car.y += car.dy;

    if(car.x + car.w > canvas.width){
        car.x = canvas.width - car.w;
    }
    if(car.y < canvas.height / 2){
        car.y = canvas.height / 2;
    }
    if(car.x < 0 ){
        car.x = 0;
    }
    if(car.y + car.h > canvas.height ){
        car.y = canvas.height - car.h;
    }
}

/**************************************************************************************************************************/
/* obstacles */

/* hole */
const hole = {
    x: Math.random() * (canvas.width - 40),
    y: -5000 * (Math.random() * 5) + 1,
    w: 50,
    h: 40,
    /*dy: 10,*/
};

function drawHole(){
    ctx.drawImage(holeImg, hole.x, hole.y, hole.w, hole.h);
}

function moveHole(){
    hole.y += (rivalsSpeed * 3);

    if(hole.y > canvas.height){
        hole.y = -3000 * (Math.random() * 5) + 1;
        hole.x = Math.random() * (canvas.width - hole.w);
        score += 25;
    }
}


/* tito */
const tito = {
    x: Math.random() * (canvas.width - 65) + 5,
    y: ((Math.random() * 700) + 1) * (-1),
    w: 60, 
    h: 70,
};

function drawTito(){
    if(!dead)
        ctx.drawImage(titoImg, tito.x, tito.y, tito.w, tito.h);
    else
        ctx.drawImage(titoImg2, tito.x, tito.y, tito.w, tito.h);
}

function moveTito(){
    tito.y += (rivalsSpeed * 3);

    if(tito.y > canvas.height){
        var space = ((Math.random() * 700) + 1) * (-1);
        if(rivals.length > 10){
            for(var i = 5; i < rivals.length -1 ; i++){
                if(Math.abs(rivals[i][1] - rivals[i+1][1]) > 150){
                    space = rivals[i][1] - 100;
                    break;
                }
            }
        }else{
            space = rivals[rivals.length -1 ][1] -150;
        }
        tito.y = space;
        tito.x = Math.random() * (canvas.width - tito.w);
        dead = false;
    }
}


/* rival cars *************************/
const rival = {
    w: 38,
    h: 70,
};


function fillRivals(numberOfObstacles){
    var freeRun = 500;
    level++;
    rivalsSpeed++;

    for(var i = 0; i < numberOfObstacles; i++){
        var img = Math.floor(Math.random() * 4) + 1;
        var laneNum = Math.floor(Math.random() * 4);
        var posX = lane[laneNum];
        var posY = -1 * (freeRun); 
        
        var distance = -1 * ((Math.floor(Math.random() * 150)) + 150);

        if(i > 0){
            posY = ( rivals[i-1][1] + distance);
        }
        var carData = [posX, posY, img];
        rivals.push(carData);
    }
}

function drawRivals(){
    for(var i = 0; i < rivals.length; i++){
        if(rivals[i][1] >= 0 && rivals[i][1] <= canvas.height){
            switch(rivals[i][2]){
                case 1: 
                    ctx.drawImage(rivalImg, rivals[i][0], rivals[i][1], rival.w, rival.h);
                    break;
                case 2: 
                    ctx.drawImage(rivalImg2, rivals[i][0], rivals[i][1], rival.w, rival.h);
                    break;
                case 3: 
                    ctx.drawImage(rivalImg3, rivals[i][0], rivals[i][1], rival.w, rival.h);
                    break;
                case 4: 
                    ctx.drawImage(rivalImg4, rivals[i][0], rivals[i][1], rival.w, rival.h);
                    break;
                default: 
                    break;
            }
        }
    }
}

function moveRivals(){
    for(var i = 0; i < rivals.length; i++){
        rivals[i][1] += rivalsSpeed;

        if(rivals[i][2] == 2){  /* red car */
            rivals[i][0] += (Math.floor(Math.random() * 7) - 3);
        }

        if(rivals[i][2] == 4){  /* bike */
            if(rivals[i][1] > canvas.height/3 && rivals[i][1] < canvas.height - 50){
                if(rivals[i][0] <= canvas.width/2){
                    rivals[i][0]++;
                }else{
                    rivals[i][0]--;
                }
            }   
        }

        if(rivals[i][0] + rival.w > canvas.width){
            rivals[i][0] = canvas.width - rival.w;
        }if(rivals[i][0] < 0){
            rivals[i][0] = 0;
        }

        /* rival out of bounds */
        if(rivals[i][1] > canvas.height){
            rivals.shift();
            score += 10;
        }
    }
}


/**************************************************************************************************************************/
/* collisions */

function checkCollision(){
    var xAxis = car.x; 
    var yAxis = car.y;

    /* rival collision */ 
    for(var i = 0; i < rivals.length; i++){
        

        if( (car.x > rivals[i][0] + 3 && (car.x < rivals[i][0] + rival.w - 3)) || (car.x + car.w > rivals[i][0] + 3 && (car.x + car.w < rivals[i][0] + rival.w - 3)) ){
            if( (car.y > rivals[i][1] + 5 && car.y < rivals[i][1] + rival.h - 5) || (car.y + car.h > rivals[i][1] + 5 && car.y + car.h < rivals[i][1] + rival.h - 5) ){
                ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100);    
                confirm(`You suck!! \n\nScore: ${score}`);
                restore();
            }
        }
    }
    /* hole collision */ 
    if( (car.x > hole.x + 8 && (car.x < hole.x + hole.w - 10)) || (car.x + car.w > hole.x + 8 && (car.x + car.w < hole.x + hole.w - 10)) ){
        if( (car.y > hole.y + 8 && car.y < hole.y + hole.h - 10) || (car.y + car.h > hole.y + 8 && car.y + car.h < hole.y + hole.h - 10) ){
            ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100);    
            confirm(`Better Kill Diego!!\n\nScore: ${score}`);
            restore();
        }
    }
    /* tito collision */ 
    if( (car.x > tito.x && (car.x < tito.x + tito.w)) || (car.x + car.w > tito.x && (car.x + car.w < tito.x + tito.w)) ){
        if( (car.y > tito.y && car.y < tito.y + tito.h) || (car.y + car.h > tito.y && car.y + car.h < tito.y + tito.h) ){                
            if(dead === false)
                score += 100;
            dead = true;
            tito.y += (car.h/2);
        }
    }
}

function restore(){
    rivals = new Array();
    hole.x = Math.random() * (canvas.width - hole.w);
    hole.y = ( (Math.random() * 2500) + 1) * (-1);
    car.y = canvas.height - 70;
    tito.x = Math.random() * (canvas.width - 40) -10 ;
    tito.y= ( (Math.random() * 500) + 1) * (-1);
    if(score > maxScore)
        maxScore = score;
    score = 0;
    level = 0;
    rivalsSpeed = 2;
}

/**************************************************************************************************************************/
/* background */

function fillWhiteLines(){
    var i = 0;
    while(i * 80 < canvas.height)
    {
        middleLines.push([canvas.width/2-5, i * 160]);
        i++;
    }
    console.log(middleLines);
}
function moveWhiteLines(){
    for(var i = 0; i < middleLines.length; i++){
        middleLines[i][1] += (rivalsSpeed * 3);
        if(middleLines[i][1] > canvas.height){
            middleLines[i][1] = -160;
        }
    }

}
function drawBackground(){

    /* middle white lines */
    for(var i = 0; i < middleLines.length; i++){
        ctx.beginPath();
        ctx.rect(middleLines[i][0], middleLines[i][1], 10, 40);
        ctx.fillStyle = "#fefefe";
        ctx.fill();
        ctx.closePath();
    }

    /* sides - white lines */
    ctx.beginPath();
    ctx.rect(5, 0, 5, canvas.height);
    ctx.fillStyle = "#fefefe";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(canvas.width-10, 0, 5, canvas.height);
    ctx.fillStyle = "#fefefe";
    ctx.fill();
    ctx.closePath();

  
}


/**************************************************************************************************************************/
/* menu */

function drawScore() {
    ctxT.fillStyle = "#000000";
    ctxT.fillRect(0, 0, 235, 140);
    ctxT.fillStyle = "#f70505";
    ctxT.font = "60px Ubuntu Mono";
    ctxT.fillText(`K i l l`, 10, 60);
    ctxT.fillText(`T i t o`, 10, 120);
    ctxT.drawImage(titoImg, 215, -3, tito.w*2+20, tito.h*2);
    
    ctxS.fillStyle = "#000000";
    ctxS.fillRect(0, 0, 350, 60);
    ctxS.fillStyle = "#ef8505";
    ctxS.font = "40px Ubuntu Mono";
    ctxS.fillText(`Top Score: ${maxScore}`, 10, 45);
    ctxS.fillStyle = "#d77803";
    ctxS.fillText(`Level: ${level}`, 10, 105);
    ctxS.fillText(`Score: ${score}`, 10, 165);
}

function drawLevel(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(20, canvas.height/3 - 30, 160, 40);
    ctx.fillStyle = "#f70505";
    ctx.font = "30px Ubuntu Mono";
    ctx.fillText(`Level ${level}`, 45, canvas.height/3);
}


/**************************************************************************************************************************/
/* main */

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxT.clearRect(0, 0, canvasText.width, canvasText.height);
    ctxS.clearRect(0, 0, canvasStats.width, canvasStats.height);
    drawBackground();
    drawHole();
    drawTito();
    drawCar();
    drawScore();
    drawRivals();
    if(rivals.length === (20 + 5 * (level-1)) && rivals[0][1] < 50 ){
        drawLevel();
    }
}

function update(){
    if(rivals.length === 0){
        fillRivals(20 + 5 * level);
        if(level > 1)
            score += 250;
    }
    moveRivals();
    moveWhiteLines();
    moveHole();
    moveTito();
    moveCar();
    checkCollision();
    draw();
    requestAnimationFrame(update);
}

//myMusic.play();
fillWhiteLines();
update();









/**************************************************************************************************************************/
/* Keyboard */

function keyDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        car.dx = car.speed;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        car.dx = -car.speed;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        car.dy = -car.speed;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        car.dy =car.speed;
    }
  }
  
function keyUp(e) {
    if (
      e.key === "Right" ||
      e.key === "ArrowRight" ||
      e.key === "Left" ||
      e.key === "ArrowLeft" ||
      e.key === "Up" ||
      e.key === "ArrowUp" ||
      e.key === "Down" ||
      e.key === "ArrowDown"
    ) {
        car.dx = 0;
        //car.dy = 0;
    }
  }


document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);