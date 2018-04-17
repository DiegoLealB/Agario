var playerBall;

var enemyBalls = [];
var balls = [];
var zoom = 0.50;
var ballQuantity = 200;

function pickColor(color) {
  if (color === 'random') {
  var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  }
  return color;
}

function pickSize() {
  var size = Math.floor(Math.random() * 100 + 50)
  return size;
}

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.style('display', 'block');
  canvas.style('margin', '20px auto');
  canvas.style('border', '1px solid black');
  
  for (var i = 0; i < ballQuantity; i++) {
    var x = random(-width * 1.667, width * 1.667); //boundries / 600 = 1.667
    var y = random(-height * 1.667, height * 1.667);
    balls[i] = new Ball(x, y, 16, pickColor('random'));
  }
  playerBall = new Ball(0, 0, 64, pickColor('red'));
  // for (var i = 0; i < 10; i++) {
  //   enemyBalls[i] = new Ball(random(-width, width), random(-height, height), pickSize(), pickColor("random"));
  // }
}

function draw() {
  // Grid (doesn't work when playerBall is large)
  // fill(201);
  // for (var i = 0; i < 800; i+= 100) {
  //   for (var j = 0; j < 800; j+= 100) {
  //     // noStroke();
  //     rect((-playerBall.pos.x/3 + i) - 30, 0, 5, 1000);
  //     rect(0, (-playerBall.pos.y/3 + j) - 30, 1000, 5);
  //   }
  // }
      
  background(255);
  translate(width/2, height/2); //Set canvas origin to center of the canvas
  var newZoom = 64 / playerBall.r;
  zoom = lerp(zoom, newZoom, 0.05);
  scale(zoom);
  translate(-playerBall.pos.x, -playerBall.pos.y);
  var ballsArr = [];

  for (var i = balls.length-1; i >=0; i--) {
    balls[i].show();
    ballsArr.push(balls[i]);
    if (playerBall.eats(balls[i])) {
      balls.splice(i, 1, new Ball(random(-width * 1.667, width * 1.667), random(-height * 1.667, height * 1.667), 16, pickColor('random')));
    }
  }
  for (var i = enemyBalls.length - 1; i >= 0; i--) {
    enemyBalls[i].show();
    enemyBalls[i].translate;
    if (playerBall.eats(enemyBalls[i])) {
      enemyBalls.splice(i, 1);
    } else if (enemyBalls[i].eats(playerBall)) {
      console.log("You died");
    }
  }
  
  playerBall.show();
  playerBall.update();

  // console.log(playerBall.r);
  // console.log(playerBall.pos.x);
  // console.log(playerBall.pos.y);
  // console.log(playerBall);
}