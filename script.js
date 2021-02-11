const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let score = 0;
let maxScore = 0;


/* car */

const car = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 70,
    w: 60,
    h: 30,
    speed: 10,
    dx: 0,
};

function drawCar(){
    ctx.beginPath();
    ctx.rect(car.x, car.y, car.w, car.h);
    ctx.fillStyle = "#d81313";
    ctx.fill();
    ctx.closePath();
}

function moveCar(){
    car.x += car.dx;

    if(car.x + car.w > canvas.width){
        car.x = canvas.width - car.w;
    }
    if(car.x < 0 ){
        car.x = 0;
    }
}


/* obstacles */
                    /* rival car */
const rival = {
    x: Math.random() * (canvas.width-60),
    y: 0,
    w: 60,
    h: 30,
    dy: 15,
};

function drawRival(){
    ctx.beginPath();
    ctx.rect(rival.x, rival.y, rival.w, rival.h);
    ctx.fillStyle = "#0b2e22";
    ctx.fill();
    ctx.closePath();
}

function moveRival(){
    rival.y += rival.dy;

    if(rival.y > canvas.height){
        rival.y = -30;
        rival.x= Math.random() * (canvas.width-60);
        score += 30;
    }
}

                /* tree */
const tree = {
    x: Math.random() * (canvas.width-60),
    y: 0,
    w: 60,
    h: 30,
    dy: 5,
};

function drawTree(){
    ctx.beginPath();
    ctx.moveTo(tree.x, tree.y);
    ctx.lineTo(tree.x + 40, tree.y);
    ctx.lineTo(tree.x + 20, tree.y - 40);
    ctx.fill();
    ctx.fillStyle = "#04b71e";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(tree.x + 15, tree.y);
    ctx.lineTo(tree.x + 25, tree.y);
    ctx.lineTo(tree.x + 25, tree.y + 20);
    ctx.lineTo(tree.x + 15, tree.y + 20);
    ctx.fill();
    ctx.fillStyle = "#452307";
    ctx.fill();
    ctx.closePath();
}

function moveTree(){
    tree.y += tree.dy;

    if(tree.y > canvas.height){
        tree.y = -30;
        tree.x= Math.random() * (canvas.width-60);
        score += 5;
    }
}


/* score*/

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${maxScore}`, 10, 20);
    ctx.fillText(`MaxScore: ${score}`, 10, 40);
}







/* drawings */

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(score > maxScore)
        maxScore = score;
    drawCar();
    drawScore();
    drawRival();
    drawTree();
}

function update(){
    moveCar();
    moveRival();
    moveTree();
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
