var time = performance.now();
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
var run = 5;
var fly = false;

//управление
function control(){
  if(earth){
    jump();
  }
}

function jump() {
  ypos -= 10; //200px
  fly = true;
  earth = false;
}

var pol = 0;

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

    if (xpos + cat.width == pipes[i].x + 100 && ypos >= pipes[i].y - 100) {
      time = performance.now() - time;
      var s = (time - time % 1000) / 1000;
      var m = 0;
      if (s >= 60){
        m = (s - s % 60) / 60;
        s = s % 60;
      }
      alert("Вы проиграли! Ваш результат: " + score + " Время игры: " + m + ":" + s);
      location.reload();
    }

    if (pipes[i].x == 5) {
      score++;
    }
  }

  if (fly) {
    jump();
  }
  if (ypos <= 100) {
    fly = false;
  }
  if (ypos == 380) {
    fly = false;
    earth = true;
  }
  if (ypos != 380 && fly == false) {
    pol++;
    if (pol <= 200) {
      ypos += 10;
      if (ypos >= 380) {
        ypos = 380;
      }
      pol = 0;
    }
  }

  ctx.fillStyle = "#FFDD00";
  ctx.font = "48px Verdana";
  ctx.fillText("Счет: " + score, 700, 50);
  //xpos += run;

  if (earth) {
    document.addEventListener("keydown", control);
  }
  requestAnimationFrame(draw);
}

bg.onload = draw;
