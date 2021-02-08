var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var cat = new Image();
var bg = new Image();
var fg = new Image();
var pipe = new Image();

cat.src = "img/cat.png";
bg.src = "img/bg.png";
fg.src = "img/cat.png";
pipe.src = "img/pipes.png";

//setup
var play = false;
var score = 0;
var earth = true;
var pipes = [];
pipes[0] = {
  x: cvs.width,
  y: 305
};

//позиция
var xpos = 50;
var ypos = 380;
var xposjump = 1;
var speedjump = 4;
var run = 5;
var fly = false;

function playGame() {
  if (play == false){
    play = true;
    draw();
    console.log("game active");
  }
  
}

//управление
function control() {
  if (earth) {
    jump();
  }
}

function jump() {
  ypos -= Math.log2(xposjump); //200px
  fly = true;
  earth = false;
}

var pol = 0;

function staticDraw(){
  if(play == false){
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(cat, xpos, ypos);
  }
}

function draw() {
  //backgrjund and cat
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(cat, xpos, ypos);
  for (var i = 0; i < pipes.length; i++) {
    ctx.drawImage(pipe, pipes[i].x, pipes[i].y);

    pipes[i].x = pipes[i].x - run;
    if (pipes[i].x == 10) {
      pipes.push({
        x: Math.floor(Math.random() % 700 + 1000),
        y: 305
      });
    }

    // xpos + cat.width == pipes[i].x + 100 && ypos >= pipes[i].y - 100
    // v2: "(xpos + 150 == pipes[i].x + 5 && ypos >= pipes[i].y) || (xpos == pipes[i].x + 5 && ypos  >= pipes[i].y)"
    if (((xpos + 150 >= pipes[i].x + 20 && xpos <= pipes[i].x + 75 ) && ypos + 50 >= pipes[i].y - 5) || ((xpos + 60 == pipes[i].x + 20 && xpos <= pipes[i].x + 75) && ypos + 50  >= pipes[i].y - 5)) {
      alert("Вы проиграли! Ваш результат: " + score);
      play = false;
      location.reload();
    }

    if (pipes[i].x == 5) {
      score++;
    }
  }

  if (fly) {
    xposjump = xposjump + speedjump;
    jump();
  }
  if (ypos <= 50) {
    fly = false;
  }
  if (ypos >= 380) {
    fly = false;
    earth = true;
    ypos = 380;
  }
  if (ypos != 380 && fly == false && xposjump != 1) {
    //pol++;
    xposjump = xposjump - speedjump;
    //if (pol <= 200) {
      ypos += Math.log2(xposjump);
      //ypos += 10;
      if (xposjump == 1) {
        ypos = 380;
      }
     // pol = 0;
   // }
  }

  ctx.fillStyle = "#FFDD00";
  ctx.font = "48px Verdana";
  ctx.fillText("Счет: " + score, 700, 50);
  //xpos += run;

  if (earth) {
    document.addEventListener("keydown", function (e) {
      console.log(e.code == 'KeyW');
      if (e.code == 'KeyW') {
        control();
      }
    });

  }
  console.log(ypos)
  if (play) {
    requestAnimationFrame(draw);
    //draw();
  }
}

bg.onload = staticDraw;
