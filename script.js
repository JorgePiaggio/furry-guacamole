const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
const canvasText = document.getElementById("canvasText");
const carImg = document.getElementById('car');
const rivalImg = document.getElementById('rival');
const rival2Img = document.getElementById('rival2');
const rival3Img = document.getElementById('rival3');
const holeImg = document.getElementById('hole');
const bikeImg = document.getElementById('bike');
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
/* car */

const car = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 70,
    w: 40,
    h: 70,
    speed: 5,
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

    var xAxis = car.x; yAxis = car.y;

        /* rival collision */ 
    if( (car.x > rival.x && (car.x < rival.x + rival.w)) || (car.x + car.w > rival.x && (car.x + car.w < rival.x + rival.w)) ){
        if( (car.y > rival.y && car.y < rival.y + rival.h) || (car.y + car.h > rival.y && car.y + car.h < rival.y + rival.h) ){
            ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100);    
            confirm(`You suck!! \n\nScore: ${score}`);
            restore();
        }
    }
        /* hole collision */ 
    if( (car.x > hole.x + 5 && (car.x < hole.x + hole.w - 10)) || (car.x + car.w > hole.x + 5 && (car.x + car.w < hole.x + hole.w - 10)) ){
        if( (car.y > hole.y && car.y < hole.y + hole.h) || (car.y + car.h > hole.y && car.y + car.h < hole.y + hole.h) ){
            ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100);    
            confirm(`Game Over Perra!\n\nScore: ${score}`);
            restore();
        }
    }
        /* bike collision */ 
    if( (car.x > bike.x && (car.x < bike.x + bike.w - 10)) || (car.x + car.w > bike.x && (car.x + car.w < bike.x + bike.w - 10)) ){
        if( (car.y > bike.y && car.y < bike.y + bike.h) || (car.y + car.h > bike.y && car.y + car.h < bike.y + bike.h) ){
            ctx.drawImage(boomImg, xAxis - 40, yAxis - 40, 100, 100);    
            confirm(`Better Kill Diego!\n\nScore: ${score}`);
            restore();
        }
    }
          /* tito collision */ 
    if( (car.x > tito.x && (car.x < tito.x + tito.w)) || (car.x + car.w > tito.x && (car.x + car.w < tito.x + tito.w)) ){
        if( (car.y > tito.y && car.y < tito.y + tito.h) || (car.y + car.h > tito.y && car.y + car.h < tito.y + tito.h) ){                
            dead = true;
            score += 100;
            tito.y += (car.h/2);
        }
    }
}

/* objects back to start position, score restore */
function restore(){
    hole.x = Math.random() * (canvas.width - hole.w);
    hole.y = ( (Math.random() * 2500) + 1) * (-1);
    bike.x = Math.random() * (canvas.width - bike.w);
    bike.y = ( (Math.random() * 2500) + 1) * (-1);
    rival.x = Math.random() * (canvas.width - car.w - 10) + 10;
    rival.y = ( (Math.random() * 500) + 1) * (-1);
    car.y = canvas.height - 70;
    tito.x = Math.random() * (canvas.width - 40) -10 ;
    tito.y= ( (Math.random() * 500) + 1) * (-1);
    if(score > maxScore)
        maxScore = score;
    score = 0;
}

/**************************************************************************************************************************/
/* obstacles */

/* rival car */
const rival = {
    x: Math.random() * (canvas.width),
    y: 0,
    w: 38,
    h: 70,
    dy: 5,
};

function drawRival(){
    ctx.drawImage(rivalImg, rival.x, rival.y, rival.w, rival.h);
}

function moveRival(){
    rival.y += rival.dy;
    rival.x += (Math.random() * 20) - 10;

    /* border check */
    if(rival.x + rival.w > canvas.width)
        rival.x = canvas.width - rival.w;
    else if(rival.x < 0)
        rival.x = 0;
    
    /* collision check */
    if((rival.y > bike.y-5 && rival.y < bike.y+bike.h) || (bike.y > rival.y-5 && bike.y < rival.y+rival.h))
    bike.dy = rival.dy;

    /*restore*/
    if(rival.y > canvas.height){
        rival.y = -30;
        rival.x = Math.random() * (canvas.width - car.w);
        rival.dy = (Math.random() * 5) + 1;
        score += 30;
    }

}


/* hole */
const hole = {
    x: Math.random() * (canvas.width - 40),
    y: -3000 * (Math.random() * 5) + 1,
    w: 50,
    h: 40,
    dy: 13,
};

function drawHole(){
    ctx.drawImage(holeImg, hole.x, hole.y, hole.w, hole.h);
}

function moveHole(){
    hole.y += hole.dy;

    if(hole.y > canvas.height){
        hole.y = -3000 * (Math.random() * 5) + 1;
        hole.x = Math.random() * (canvas.width - hole.w);
        score += 5;
    }
}


/* bike */
const bike = {
    x: Math.random() * (canvas.width - 40),
    y: -500,
    w: 30, 
    h: 50,
    dy: 8,
};

function drawBike(){
    ctx.drawImage(bikeImg, bike.x, bike.y, bike.w, bike.h);
}

function moveBike(){
    bike.y += bike.dy;

    if(bike.y > canvas.height){
        bike.y = -6130 + (Math.random() * 2) + 1;
        bike.x = Math.random() * (canvas.width - bike.w);
        score += 5;
    }
}


/* tito */
const tito = {
    x: Math.random() * (canvas.width - 35) + 5,
    y: ( (Math.random() * 500) + 1) * (-1),
    w: 60, 
    h: 70,
    dy: 7,
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


/* menu **********************************************************/
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
/* drawings */

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxT.clearRect(0, 0, canvasText.width, canvasText.height);
    drawBackground();
    drawHole();
    drawTito();
    drawCar();
    drawScore();
    drawRival();
    drawBike();
}

function update(){
    moveCar();
    moveRival();
    moveHole();
    moveBike();
    moveTito();
    draw();
    requestAnimationFrame(update);
}
myMusic.play();
update();



/**************************************************************************************************************************/
/* Keyboard */

function keyDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        car.dx = car.speed;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        car.dx = -car.speed;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        car.dy = -(Math.floor(car.speed / 2));
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        car.dy = Math.floor(car.speed / 2);
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
    }
  }


document.addEventListener("keydown", keyDown);
/*document.addEventListener("keyup", keyUp);*/