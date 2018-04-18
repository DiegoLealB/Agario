var playerBall;
var enemyBalls = [];
var enemyBall;
var balls = [];
var zoom = 0.50; //Changed default zoom here for zoom in effect when loading the game
var ballQuantity = 100;

function startGame() {
  playerBall = new Ball(0, 0, 300);
  for (var i = 0; i < 10; i++){
    enemyBall = new Enemy(random(-width * 1.667, width * 1.667), random(-height * 1.667, height * 1.667), pickSize(), pickColor('random'));
    enemyBalls[i] = enemyBall;
  }

  for (var i = 0; i < ballQuantity; i++) {
    var x = random(-width * 1.667, width * 1.667); //boundries / 600 = 1.667
    var y = random(-height * 1.667, height * 1.667);
    balls[i] = new Ball(x, y, 16);
  }
}

function pickColor(color) {
  if (color === 'random') {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  } else {
  return color;
  }
}

function pickSize() {
  var size = Math.floor(Math.random() * 150 + 20)
  return size;
}

function buttonStyles() {
  var button = createButton('Restart Game');
  button.style('background-color', 'white');
  button.style('border', '2px solid black');
  button.style('border-radius', '5px');
  button.style('display', 'block');
  button.style('margin', '0 auto');
  button.style('width', '100px');
  button.style('height', '40px');
  button.style('font-weight', 'bold');
  button.style('color', pickColor('random'));
  button.mousePressed(startGame);
}

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.style('display', 'block');
  canvas.style('margin', '20px auto');
  canvas.style('border', '1px solid black');
  
  startGame();
  buttonStyles();
  
  // frameRate(60);
}

function draw() {
  background(255);
  translate(width/2, height/2); //Set canvas origin to center of the canvas
  var newZoom = 64 / playerBall.r; //Update zoom depending on playerBall size
  zoom = lerp(zoom, newZoom, 0.02);
  scale(zoom);
  translate(-playerBall.pos.x, -playerBall.pos.y); //Moving the canvas opposite the position of the mouse pointer
  
  for (var i = balls.length-1; i >=0; i--) {
    balls[i].show();
    if (playerBall.eats(balls[i])) {
      balls.splice(i, 1);
      for (var j = 0; j < ballQuantity - balls.length; j++) {
        balls.push(new Ball(random(-width * 1.667, width * 1.667), random(-height * 1.667, height * 1.667), 16));
      }
    } 
  }
      
      // Grid (doesn't work when playerBall is large)
      // fill(201);
      // for (var i = 0; i < 800; i+= 100) {
        //   for (var j = 0; j < 800; j+= 100) {
          //     // noStroke();
          //     rect((-playerBall.pos.x/3 + i) - 30, 0, 5, 1000);
  //     rect(0, (-playerBall.pos.y/3 + j) - 30, 1000, 5);
  //   }
  // }
  // }
  
  playerBall.show();
  playerBall.update();
  // fill(pickColor('red')) //Makes everything same color;
  
  for (var i = 0; i < enemyBalls.length; i++) {
    enemyBalls[i].show();
    enemyBalls[i].update();
  }
  

  // --------------Tests----------------
  // console.log(balls.length);
  // console.log(frameRate())
  console.log(enemyBalls.length);
  // console.log(playerBall.pos.x);
  // console.log(playerBall.pos.y);
  // console.log(playerBall.r);
}