var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// adding image variables
var bg = new Image();
var bird = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bg.src = "images/bg.png";
bird.src = "images/bird.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// pipe constant
var gap = 85;
var constant = pipeNorth.height + gap

// bird position
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

// adding audio
var fly = new Audio();
var scoreP = new Audio();

fly.src = "sounds/fly.mp3";
scoreP.src = "sounds/score.mp3";

// on key down
document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 30;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

// display canvas
window.onload = function draw(){
    ctx.drawImage(bg,0,0);


    for(var i = 0; i < this.pipe.length; i++){
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y + constant);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
            })
        }

        // Gameover condition 

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >= cvs.height - fg.height){
            location.reload(); //js predefined reload fxn
        } 

        if(pipe[i].x == 5){
            score++;
            scoreP.play();
        }
    }
    

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillstyle = "#000";
    ctx.font = "20px verdana";
    ctx.fillText("Score : " +score,10,cvs.height-20)

    requestAnimationFrame(draw)
}
