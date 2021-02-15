const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
const canvasText = document.getElementById("canvasText");
const carImg = document.getElementById('car');
const rivalImg = document.getElementById('rival');
const rivalImg2= document.getElementById('rival2');
const rivalImg3 = document.getElementById('rival3');
const rivalImg4 = document.getElementById('bike');

const holeImg = document.getElementById('hole');
const titoImg = document.getElementById('tito');
const titoImg2 = document.getElementById('tito2');
const boomImg = document.getElementById('boom');
const ctx = canvas.getContext('2d');
const ctxT = canvasText.getContext('2d');
var myMusic= document.getElementById("music");

let score = 0;
let maxScore = 0;
let dead = false;
let iter = 0;


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
    dy: 10,
};

function drawHole(){
    ctx.drawImage(holeImg, hole.x, hole.y, hole.w, hole.h);
}

function moveHole(){
    hole.y += hole.dy;

    if(hole.y > canvas.height){
        hole.y = -3000 * (Math.random() * 5) + 1;
        hole.x = Math.random() * (canvas.width - hole.w);
        score += 25;
    }
}


/* tito */
const tito = {
    x: Math.random() * (canvas.width - 65) + 5,
    y: ( (Math.random() * 500) + 1) * (-1),
    w: 60, 
    h: 70,
    dy: 6,
};

function drawTito(){
    if(!dead)
        ctx.drawImage(titoImg, tito.x, tito.y, tito.w, tito.h);
    else
        ctx.drawImage(titoImg2, tito.x, tito.y, tito.w, tito.h);

}

function moveTito(){
    tito.y += tito.dy;

    if(tito.y > canvas.height){
        tito.y = -6130 + (Math.random() * 2) + 1;
        tito.x = Math.random() * (canvas.width - tito.w);
        dead = false;
    }
}

/* rival cars *************************/

const rival = {
    w: 38,
    h: 70,
};
let rivals = new Array();
const lane = [10, 55, 110, 155];
const rivalsSpeed = 3;

function fillRivals(){
    var freeRun = 500;

    while(rivals.length < 30){
        var img = Math.floor(Math.random() * 4) + 1;
        var laneNum = Math.floor(Math.random() * 4);
        var posX = lane[laneNum];

        var distance = (Math.floor(Math.random() * 150)) + 150;
        var posY = -1 * (freeRun + distance); 
        console.log("d: ", distance,"pos: ", posY);
        var carData = [posX, posY, img];
        freeRun += 150;

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
            confirm(`Game Over Perra!\n\nScore: ${score}`);
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

}

/**************************************************************************************************************************/
/* background */

function drawBackground(){
    iter++;
    var m = -120; 
    var x = 0;
    ctx.fillStyle = "#3db303"

    while(m < canvas.height){
        if(iter % 2 == 0)
            x = 1;
        else x = 5;
        /* middle white lines */
        if(m % 100 == 0)
        {
        ctx.beginPath();
        ctx.rect( (canvas.width/2) - 5, m + 11 * iter, 10, 40);
        ctx.fillStyle = "#fefefe";
        ctx.fill();
        ctx.closePath();
        }
        m += 10;
    }
    

    /* sides - white lines */
    ctx.beginPath();
    ctx.rect( 5, 0, 5, canvas.height);
    ctx.fillStyle = "#fefefe";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect( canvas.width-10, 0, 5, canvas.height);
    ctx.fillStyle = "#fefefe";
    ctx.fill();
    ctx.closePath();

    if(iter > 15)
        iter = 0;
}


/**************************************************************************************************************************/
/* menu */

function drawScore() {
    ctxT.fillStyle = "#f13f3f";
    ctxT.font = "60px Verdana";
    ctxT.fillText(`Kill Tito`, 10, 70);
    ctxT.drawImage(titoImg, 225, -3, tito.w*2, tito.h*2);
    ctxT.fillStyle = "#ab5f03";
    ctxT.font = "40px Ubuntu Mono";
    ctxT.fillText(`MaxScore: ${maxScore}`, 10, 150);
    ctxT.fillStyle = "#d77803";
    ctxT.fillText(`Score: ${score}`, 10, 200);
}


/**************************************************************************************************************************/
/* main */

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxT.clearRect(0, 0, canvasText.width, canvasText.height);
    drawBackground();
    drawHole();
    drawTito();
    drawCar();
    drawScore();
    drawRivals();
}

function update(){
    if(rivals.length === 0){
        fillRivals();
    }
    moveRivals();
    moveHole();
    moveTito();
    moveCar();
    checkCollision();
    draw();
    requestAnimationFrame(update);
}

//myMusic.play();
fillRivals();
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