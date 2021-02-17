const canvas = document.getElementById("canvas");
if(window.innerHeight > 600){
    canvas.height = window.innerHeight;
}else canvas.height = 600;
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

let iter = 0;
let score = 0;
let maxScore = 0;
let startedGame = false;
let dead = false;
let level = 1;
let lives = 3;
let rivals = new Array();
let rivalsSpeed = 3;
let freeRun = 500;
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
    y: ((Math.random() * 1300) + 800) * (-1),
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
    
    /* avoid tito & rival collision */ 
    if(tito.y > -50 && tito.y < canvas.height){
        for(var i = 0; i < rivals.length; i++){
            if( (tito.x > rivals[i][0] + 3 && (tito.x < rivals[i][0] + rival.w - 3)) || (tito.x + tito.w > rivals[i][0] + 3 && (tito.x + tito.w < rivals[i][0] + rival.w - 3)) ){
                if( (tito.y > rivals[i][1] + 5 && tito.y < rivals[i][1] + rival.h - 5) || (tito.y + tito.h > rivals[i][1] + 5 && tito.y + tito.h < rivals[i][1] + rival.h - 5) ){
                    tito.y = rivals[i][1] - 50 ;
                }
            }
        }
    }
    
    if(tito.y > canvas.height){
        var laneNum = Math.floor(Math.random() * 4);
        tito.x = lane[laneNum] - 15;
        tito.y = ((Math.random() * 5300) + 5000) * (-1);
        dead = false;
    }
}


/* rival cars *************************/
const rival = {
    w: 38,
    h: 70,
};


function fillRivals(numberOfObstacles){
    //level++;
    //rivalsSpeed++;

    for(var i = 0; i < numberOfObstacles; i++){
        var img = Math.floor(Math.random() * 4) + 1;
        var laneNum = Math.floor(Math.random() * 4);
        var posX = lane[laneNum];
        var posY = -1 * (freeRun); 
        
        var distance = -1 * ((Math.floor(Math.random() * 150)) + 250);

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
        if(rivals.length == 0){     // level complete
            score += 250;
            level++;               
            rivalsSpeed++;
        }
    }
}


/**************************************************************************************************************************/
/* collisions */

async function checkCollision(){
    var xAxis = car.x; 
    var yAxis = car.y;

    /* rival collision */ 
    for(var i = 0; i < rivals.length; i++){
        if( (car.x > rivals[i][0] + 3 && (car.x < rivals[i][0] + rival.w - 3)) || (car.x + car.w > rivals[i][0] + 3 && (car.x + car.w < rivals[i][0] + rival.w - 3)) ){
            if( (car.y > rivals[i][1] + 5 && car.y < rivals[i][1] + rival.h - 5) || (car.y + car.h > rivals[i][1] + 5 && car.y + car.h < rivals[i][1] + rival.h - 5) ){
                if(lives == 1){
                    ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100);       // game over
                    snd1.pause();
                    snd1.currentTime = 0;
                    confirm(`You suck!! \n\nScore: ${score}`);
                    lives = 3;
                    level = 1;
                    if(score > maxScore)
                        maxScore = score;
                    score = 0;
                    restore();
                }else{                                                              // life lost
                    ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100); 
                    lives--;
                    snd4.play();     
                    restore(); 
                }                            
            }
        }
    }
    /* hole collision */ 
    if( (car.x > hole.x + 8 && (car.x < hole.x + hole.w - 10)) || (car.x + car.w > hole.x + 8 && (car.x + car.w < hole.x + hole.w - 10)) ){
        if( (car.y > hole.y + 8 && car.y < hole.y + hole.h - 10) || (car.y + car.h > hole.y + 8 && car.y + car.h < hole.y + hole.h - 10) ){
            if(lives == 1){
                ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100);       // game over
                snd1.pause(); 
                snd1.currentTime = 0;
                confirm(`Better Kill Diego!!\n\nScore: ${score}`);
                lives = 3;
                level = 1;
                if(score > maxScore)
                    maxScore = score;
                score = 0;
                restore();
            }else{                                                              // life lost
                ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100);
                lives--;
                snd2.play();
                var i = 0;
                restore();
            }       
        }
    }
    /* tito collision */ 
    if( (car.x > tito.x && (car.x < tito.x + tito.w)) || (car.x + car.w > tito.x && (car.x + car.w < tito.x + tito.w)) ){
        if( (car.y > tito.y && car.y < tito.y + tito.h) || (car.y + car.h > tito.y && car.y + car.h < tito.y + tito.h) ){                
            if(dead === false)
                score += 100;
            dead = true;
            snd3.play();
            tito.y += (car.h/3);
        }
    }
}

function restore(){
    //rivals = new Array();
    if(lives > 0){                                      
        for(var i = 0; i < rivals.length; i++){
            rivals[i][1] -= (freeRun*2);
        }
    }
    hole.x = Math.random() * (canvas.width - hole.w);
    hole.y = ( (Math.random() * 3500) + 2000) * (-1);
    car.y = canvas.height - 70;
    var laneNum = Math.floor(Math.random() * 4);
    tito.x = lane[laneNum] - 10;
    tito.y = ((Math.random() * 1300) + 800) * (-1);
    dead = false;
    rivalsSpeed = level + 2;
    snd1.play();
}

/**************************************************************************************************************************/
/* background */

function fillWhiteLines(){
    var i = 0;
    while(i * 80 < canvas.height)
    {
        middleLines.push( [canvas.width/2 - 5, i * 160] );
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

    /* sides white lines */
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
    // game title canvas
    ctxT.fillStyle = "#000000";
    ctxT.fillRect(0, 0, 235, 140);
    ctxT.fillStyle = "#f70505";
    ctxT.font = "60px Ubuntu Mono";
    ctxT.fillText(`K i l l`, 10, 60);
    ctxT.fillText(`T i t o`, 10, 120);
    ctxT.drawImage(titoImg, 215, -3, tito.w*2+20, tito.h*2);
    
    //scores canvas
    ctxS.fillStyle = "#000000";
    ctxS.fillRect(0, 0, 350, 60);
    ctxS.fillStyle = "#d77803";
    ctxS.font = "40px Ubuntu Mono";
    ctxS.fillText(`Top Score: ${maxScore}`, 10, 45);
    ctxS.fillStyle = "#f78800";
    ctxS.fillText(`Level: ${level}`, 10, 105);
    ctxS.fillText(`Score: ${score}`, 10, 165);
    ctxS.fillStyle = "#000000";
    ctxS.fillRect(0, 190, 350, 100);
    ctxS.fillStyle = "#ffffff";
    ctxS.fillRect(120, 190, 5, 70);
    ctxS.fillRect(220, 190, 5, 70);
    for(var i = 0; i < lives; i++){
        ctxS.drawImage(carImg, 50 + i * 100, 200, car.w, car.h);
    }
}

function drawLevel(){
    // level number in route
    ctx.fillStyle = "#000000";
    ctx.fillRect(20, canvas.height/3 - 30, 160, 40);
    ctx.fillStyle = "#f70505";
    ctx.font = "30px Ubuntu Mono";
    ctx.fillText(`Level ${level}`, 45, canvas.height/3);
}



/**************************************************************************************************************************/
/* sounds */
var snd1  = new Audio();
var src1  = document.createElement("source");
src1.type = "audio/mpeg";
src1.src  = "sounds/zero.ogg";
snd1.appendChild(src1);
snd1.volume = 0.7;
snd1.loop = true;

var snd2  = new Audio();
var src2  = document.createElement("source");
src2.type = "audio/mpeg";
src2.src  = "sounds/cuidadoTio.ogg";
snd2.appendChild(src2);

var snd3  = new Audio();
var src3  = document.createElement("source");
src3.type = "audio/mpeg";
src3.src  = "sounds/aaa.ogg";
snd3.appendChild(src3);
snd3.volume = 0.7;

var snd4  = new Audio();
var src4  = document.createElement("source");
src4.type = "audio/mpeg";
src4.src  = "sounds/noChoquen.ogg";
snd4.appendChild(src4);

var snd5  = new Audio();
var src5  = document.createElement("source");
src5.type = "audio/mpeg";
src5.src  = "sounds/nono.opus";
snd5.appendChild(src5);


var snd6  = new Audio();
var src6  = document.createElement("source");
src6.type = "audio/mpeg";
src6.src  = "sounds/gameOver.ogg";
snd6.appendChild(src6);


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
    if(rivals.length === (10 + 5 * (level)) && rivals[0][1] < 50 ){
        drawLevel();
    }
}

function update(){
    if(rivals.length === 0){
        fillRivals(10 + 5 * level);
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

fillWhiteLines();
draw();

function startGame(){
    if(!startedGame){
        snd1.play(); 
        snd5.play();
        update();
        startedGame = true;
    }    
}



/**************************************************************************************************************************/
/* Keyboard */

function keyDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        car.dx = car.speed;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        car.dx = -car.speed;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        car.dy = -car.speed;
        if(!startedGame){
            startGame();
        }
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        car.dy =car.speed;
    }else if (e.key === "Enter") {
        if(!startedGame){
            startGame();
        }
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

  function touchHandler(event)
  {
      var touches = event.changedTouches,
          first = touches[0],
          type = "";
      switch(event.type)
      {
          case "touchstart": type = "mousedown"; break;
          case "touchmove":  type = "mousemove"; break;        
          case "touchend":   type = "mouseup";   break;
          default:           return;
      }
  
      // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
      //                screenX, screenY, clientX, clientY, ctrlKey, 
      //                altKey, shiftKey, metaKey, button, relatedTarget);
  
      var simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                    first.screenX, first.screenY, 
                                    first.clientX, first.clientY, false, 
                                    false, false, false, 0/*left*/, null);
  
      first.target.dispatchEvent(simulatedEvent);
      event.preventDefault();
  }


  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);    
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);