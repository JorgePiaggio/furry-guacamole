const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
const canvasText = document.getElementById("canvasText");
const carImg = document.getElementById('car');
const rivalImg = document.getElementById('rival');
const holeImg = document.getElementById('hole');
const peopleImg = document.getElementById('people');
const titoImg = document.getElementById('tito');
const titoImg2 = document.getElementById('tito2');
const ctx = canvas.getContext('2d');
const ctxT = canvasText.getContext('2d');
let score = 0;
let maxScore = 0;
let dead = false;



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

        /* rival collision */ 
    if( (car.x > rival.x && (car.x < rival.x + rival.w)) || (car.x + car.w > rival.x && (car.x + car.w < rival.x + rival.w)) ){
        if(car.y > rival.y && car.y < rival.y + rival.h){
            confirm(`Loser! \n\nScore: ${score}`);
            hole.x = Math.random() * (canvas.width - hole.w);
            hole.y = ( (Math.random() * 2500) + 1) * (-1);
            people.x = Math.random() * (canvas.width - people.w);
            people.y = ( (Math.random() * 2500) + 1) * (-1);
            rival.x = Math.random() * (canvas.width - car.w);
            rival.y = ( (Math.random() * 500) + 1) * (-1);
            car.y = canvas.height - 70;
            tito.x= Math.random() * (canvas.width - 40);
            tito.y= ( (Math.random() * 500) + 1) * (-1);
            if(score > maxScore)
                maxScore = score;
            score = 0;

        }


        
    }
        /* hole collision */ 
    if( (car.x > hole.x && (car.x < hole.x + hole.w - 10)) || (car.x + car.w > hole.x && (car.x + car.w < hole.x + hole.w - 10)) ){
        if(car.y > hole.y && car.y < hole.y + hole.h){
            confirm(`Game Over Perra!\n\nScore: ${score}`);
            hole.x = Math.random() * (canvas.width - hole.w);
            hole.y = ( (Math.random() * 2500) + 1) * (-1);
            people.x = Math.random() * (canvas.width - people.w);
            people.y = ( (Math.random() * 2500) + 1) * (-1);
            rival.x = Math.random() * (canvas.width - car.w);
            rival.y = ( (Math.random() * 500) + 1) * (-1);
            car.y = canvas.height - 70;
            tito.x= Math.random() * (canvas.width - 40);
            tito.y= ( (Math.random() * 500) + 1) * (-1);
            if(score > maxScore)
                maxScore = score;
            score = 0;
        }
    }

        /* people collision */ 
    if( (car.x > people.x && (car.x < people.x + people.w - 10)) || (car.x + car.w > people.x && (car.x + car.w < people.x + people.w - 10)) ){
        if(car.y > people.y && car.y < people.y + people.h){
            confirm(`So sorry!\n\nScore: ${score}`);
            hole.x = Math.random() * (canvas.width - hole.w);
            hole.y = ( (Math.random() * 2500) + 1) * (-1);
            people.x = Math.random() * (canvas.width - people.w);
            people.y = ( (Math.random() * 2500) + 1) * (-1);
            rival.x = Math.random() * (canvas.width - car.w);
            rival.y = ( (Math.random() * 500) + 1) * (-1);
            car.y = canvas.height - 70;
            tito.x= Math.random() * (canvas.width - 40);
            tito.y= ( (Math.random() * 500) + 1) * (-1);
            if(score > maxScore)
                maxScore = score;
            score = 0;
        }
    }

          /* tito collision */ 
        if( (car.x > tito.x && (car.x < tito.x + tito.w)) || (car.x + car.w > tito.x && (car.x + car.w < tito.x + tito.w)) ){
            if(car.y > tito.y && car.y < tito.y + tito.h){                
                dead = true;
                score += 100;
                tito.y += car.h;
            }
        }
}


/**************************************************************************************************************************/
/* obstacles */

    /* rival car */
const rival = {
    x: Math.random() * (canvas.width-60),
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

    if(rival.x + rival.w > canvas.width)
        rival.x = canvas.width - rival.w;
    else if(rival.x < 0)
        rival.x = 0;


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


    /* people */
const people = {
    x: Math.random() * (canvas.width - 40),
    y: -500,
    w: 30, 
    h: 50,
    dy: 8,
};

function drawPeople(){
    ctx.drawImage(peopleImg, people.x, people.y, people.w, people.h);
}

function movePeople(){
    people.y += people.dy;

    if(people.y > canvas.height){
        people.y = -6130 + (Math.random() * 2) + 1;
        people.x = Math.random() * (canvas.width - people.w);
        score += 5;
    }
}


    /* tito */
const tito = {
    x: Math.random() * (canvas.width - 35) + 5,
    y: ( (Math.random() * 500) + 1) * (-1),
    w: 60, 
    h: 80,
    dy: 4,
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

    var m = 0;
    var x = 5;
    var y = 3;
    ctx.fillStyle = "#3db303"
    if(Math.floor(rival.y) % 2 == 0)
        x = 0;
    else x = 5;


    while(m < canvas.height){
        
        /* grass */
     /*   if(m % 30 == 0){
            y = 3;
            ctx.fillStyle = "#7af13f";
        }else{
            ctx.fillStyle = "#3db303";
            y = 0;
        }

        if(m % 30 == 0){
            ctx.fillStyle = "#7af13f";
        }else{
            ctx.fillStyle = "#3db303";
        }

        ctx.beginPath();
        ctx.moveTo(0, 0 + m + x);
        ctx.lineTo(0, 10 + m + x);    
        ctx.lineTo(5 + y, 5 + m + x);    
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(canvas.width, 0 + m + x);
        ctx.lineTo(canvas.width, 10 + m + x);    
        ctx.lineTo(canvas.width - 5 - y, 5 + m + x);    
        ctx.fill();
        ctx.closePath();

        /* middle white lines */
        if(m % 100 == 0)
        {
        ctx.beginPath();
        ctx.rect( (canvas.width/2) - 5, 0 + m - 4*x, 10, 40);
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
}


/* score*/

function drawScore() {
    ctxT.fillStyle = "#ae0e03";
    ctxT.font = "40px Arial";
    ctxT.fillText(`MaxScore: ${maxScore}`, 10, 50);
    ctxT.fillStyle = "#f13f3f";
    ctxT.fillText(`Score: ${score}`, 10, 100);
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
    drawPeople();
}

function update(){
    moveCar();
    moveRival();
    moveHole();
    movePeople();
    moveTito();
    draw();
    requestAnimationFrame(update);
}

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