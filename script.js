const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const superman = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 100,
    w: 60,
    h: 30,
    speed: 10,
    dx: 0,
};

console.log(superman.x, superman.y);

function drawSuperman(){
    ctx.beginPath();
    ctx.rect(superman.x, superman.y, superman.w, superman.h);
    ctx.fillStyle = "#d81313";
    ctx.fill();
    ctx.closePath();
}

function moveSuperman(){
    superman.x += superman.dx;

    if(superman.x + superman.w > canvas.width){
        superman.x = canvas.width - superman.w;
    }
    if(superman.x < 0 ){
        superman.x = 0;
    }
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSuperman();
}

function update(){
    moveSuperman();
    draw();
    requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        superman.dx = superman.speed;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        superman.dx = -superman.speed;
    }
  }
  
  // Keyup event
  function keyUp(e) {
    if (
      e.key === "Right" ||
      e.key === "ArrowRight" ||
      e.key === "Left" ||
      e.key === "ArrowLeft"
    ) {
        superman.dx = 0;
    }
  }

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
