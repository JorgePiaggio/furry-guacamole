const canvas = document.getElementById("canvas");
const canvasText = document.getElementById("canvasText");
const carImg = document.getElementById('car');
const rivalImg = document.getElementById('rival');
const holeImg = document.getElementById('hole');
const peopleImg = document.getElementById('people');
const ctx = canvas.getContext('2d');
const ctxT = canvasText.getContext('2d');
let score = 0;
let maxScore = 0;


/* car */

const car = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 70,
    w: 40,
    h: 70,
    speed: 5,
    dx: 0,
};

function drawCar(){ 
    ctx.drawImage(carImg, car.x, car.y, car.w, car.h);
    /*ctx.beginPath();
    ctx.rect(car.x, car.y, car.w, car.h);
    ctx.fillStyle = "#d81313";
    ctx.fill();
    ctx.closePath();*/
}

function moveCar(){
    car.x += car.dx;

    if(car.x + car.w > canvas.width){
        car.x = canvas.width - car.w;
    }
    if(car.x < 0 ){
        car.x = 0;
    }

    /* car collision */ 
    if( (car.x > rival.x && (car.x < rival.x + rival.w)) || (car.x + car.w > rival.x && (car.x + car.w < rival.x + rival.w)) ){
        if(car.y > rival.y && car.y < rival.y + rival.h){
            confirm(`Loser! \n\nScore: ${score}`);
            score = 0;
            rival.x = Math.random() * (canvas.width - car.w);
            rival.y = 0;
            hole.x = Math.random() * (canvas.width - hole.w);
            hole.y = 0;
        }


        
    }
        /* hole collision */ 
    if( (car.x > hole.x && (car.x < hole.x + hole.w - 10)) || (car.x + car.w > hole.x && (car.x + car.w < hole.x + hole.w - 10)) ){
        if(car.y > hole.y && car.y < hole.y + hole.h){
            confirm(`Game Over Perra!\n\nScore: ${score}`);
            score = 0;
            hole.x = Math.random() * (canvas.width - hole.w);
            hole.y = 0;
            rival.x = Math.random() * (canvas.width - car.w);
            rival.y = 0;
        }
    }

    
    




}


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
        rival.dy = (Math.random() * 10) + 5;
        score += 30;
    }

}

            /* hole */
const hole = {
    x: Math.random() * (canvas.width - 40),
    y: 0,
    w: 70,
    h: 60,
    dy: 15,
};

function drawHole(){
    ctx.drawImage(holeImg, hole.x, hole.y, hole.w, hole.h);
}

function moveHole(){
    hole.y += hole.dy;

    if(hole.y > canvas.height){
        hole.y = -300 * (Math.random() * 5) + 1;
        hole.x = Math.random() * (canvas.width - hole.w);
        score += 5;
    }
}

            /* people */
const people = {
    x: Math.random() * (canvas.width - 40),
    y: 0,
    w: 30, 
    h: 50,
    dy: 10,
};

function drawPeople(){
    ctx.drawImage(peopleImg, people.x, people.y, people.w, people.h);
}

function movePeople(){
    people.y += people.dy;

    if(people.y > canvas.height){
        people.y = -6130;
        people.x = Math.random() * (canvas.width - people.w);
        score += 5;
    }
}



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
        if(m % 30 == 0){
            y = 3;
            ctx.fillStyle = "#7af13f";
        }else{
            ctx.fillStyle = "#3db303";
            y = 0;
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
    ctxT.fillText(`MaxScore: ${maxScore}`, 10, 20);
    ctxT.fillText(`Score: ${score}`, 10, 40);
}







/* drawings */

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxT.clearRect(0, 0, canvasText.width, canvasText.height);
    if(score > maxScore)
        maxScore = score;
    drawBackground();
    drawCar();
    drawHole();
    drawScore();
    drawRival();
    drawPeople();
}

function update(){
    moveCar();
    moveRival();
    moveHole();
    movePeople();
    //score++;
    draw();
    requestAnimationFrame(update);
}

  update();




/* Keyboard */

function keyDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        car.dx = car.speed;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        car.dx = -car.speed;
    }
  }
  
function keyUp(e) {
    if (
      e.key === "Right" ||
      e.key === "ArrowRight" ||
      e.key === "Left" ||
      e.key === "ArrowLeft"
    ) {
        car.dx = 0;
    }
  }


document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
