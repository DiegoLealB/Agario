var playerBall, enemyBall, grid, worldScale, boundries, rSlider, gSlider, bSlider, aSlider, boundriesSlider;
var playerBallArr = [];
var enemyBalls = [];
var balls = [];
var grids = [];
var zoom = 0.50; //Changed default zoom here for zoom in effect when loading the game
const playerSize = 100;
const ballQuantity = 300;
const enemiesQuantity = 20;
boundries = 3000;
worldScale = boundries / 600;

function startGame() {
  enemyBalls.splice(0, enemyBalls.length);
  playerBallArr.splice(0, 1);

  playerBall = new Ball(0, 0, playerSize);
  playerBallArr.push(playerBall);
  var counter = 0;
  
  while (enemyBalls.length < enemiesQuantity) {
    var isOverlapping = true;
    enemyBall = new Enemy(
      random(-width * worldScale, width * worldScale),
      random(-height * worldScale, height * worldScale),
      pickSize(180));

    if ((enemyBall.pos.x < -300 || enemyBall.pos.x > 300) && 
    (enemyBall.pos.y < -300 || enemyBall.pos.y > 300)) {
      isOverlapping = false;
    }

    if (!isOverlapping) {
      enemyBalls.push(enemyBall);
    }
    
    counter++

    if (counter > 10000) {
      break;
    }
  }

  for (var i = 0; i < ballQuantity; i++) {
    var x = random(-width * worldScale, width * worldScale);
    var y = random(-height * worldScale, height * worldScale);
    balls[i] = new Ball(x, y, 16);
  }
}

function pickSize(size) {
  randomSize = Math.floor(Math.random() * size + 16);
  return randomSize;
}

function randomColor() {
  let r = Math.floor(Math.random() * 255)
  let g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)
  const color = rgb(r, g, b);
  return color;
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
  button.style('color', 'black');
  button.mousePressed(startGame);
}

function drawGrid() {
  var w = 400;
  var rows = floor(600 * worldScale * 2 / w);
  var cols = floor(600 * worldScale * 2 / w);
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      var grid = new Grid(x, y, w);
      grids.push(grid);
    }
  }
}

function collision() {
  for (var i = enemyBalls.length - 1; i >= 0; i--) {
    if (playerBall.eats(enemyBalls[i])) {
      enemyBalls.splice(i, 1);
    }
    else if (enemyBalls[i].eats(playerBall)) {
      playerBallArr.splice(0, 1);
    }
    for (var j = enemyBalls.length - 1; j >= 0; j--) {
      if (enemyBalls[i] !== undefined && enemyBalls[j] !== undefined) { //Checks for empty values in array
        if (enemyBalls[j].eats(enemyBalls[i])) {
          enemyBalls[i].splice(i, 1);
        }
      }
    }
  }

  for (var i = balls.length - 1; i >= 0; i--) {
    balls[i].show();
    if (playerBall.eats(balls[i])) {
      balls.splice(i, 1);
      for (var j = 0; j < ballQuantity - balls.length; j++) {
        balls.push(new Ball(
          random(-width * worldScale, width * worldScale),
          random(-height * worldScale, height * worldScale),
          16));
      }
    }
    for (var k = enemyBalls.length - 1; k >= 0; k--) {
      if (enemyBalls[k].eats(balls[i])) {
        balls.splice(i, 1);
        for (var j = 0; j < ballQuantity - balls.length; j++) {
          balls.push(new Ball(
            random(-width * worldScale, width * worldScale),
            random(-height * worldScale, height * worldScale),
            16));
        }
      }
      else if (enemyBall.eats(balls[i])) {
        balls.splice(i, 1);
        for (var j = 0; j < ballQuantity - balls.length; j++) {
          balls.push(new Ball(
            random(-width * worldScale, width * worldScale),
            random(-height * worldScale, height * worldScale),
            16));
        }
      }
    }
  }

  return i;
}

function setup() {
  alert("Eat all of the enemies or get to a mass of 300 to win")
  var canvas = createCanvas(600, 600);
  canvas.style('display', 'block');
  canvas.style('margin', '20px auto');
  canvas.style('border', '1px solid black');  
  

  startGame();
  buttonStyles();
  drawGrid();

  rSlider = createSlider(0, 255, 230);
  gSlider = createSlider(0, 255, 0);
  bSlider = createSlider(0, 255, 230);
  aSlider = createSlider(0, 1, 0.7, 0.05);
  rSlider.position(10, 40);
  gSlider.position(10, 65);
  bSlider.position(10, 90);
  aSlider.position(10, 115);
}

function draw() {
  background(0);

  push()
  stroke(255);
  fill(255);
  text("Mass:" + Math.floor(playerBall.r), 0, 10)
  pop();

  var r = rSlider.value();
  var g = gSlider.value();
  var b = bSlider.value();
  var a = aSlider.value();
  fill('rgba(' + r + ',' + g + ',' + b + ',' + a + ')');

  translate(width/2, height/2); //Set canvas origin to center of the canvas
  
  if (playerBall.r !== 0) {
    var newZoom = 64 / playerBall.r; //Update zoom depending on playerBall size
  } else {
    newZoom = 0.3;
  }

  zoom = lerp(zoom, newZoom, 0.02);
  scale(zoom);
  translate(-playerBall.pos.x, -playerBall.pos.y); 
  //Moving the canvas opposite the position of the mouse pointer
  
  
  for (var i = 0; i < grids.length; i++) {
    grids[i].show();
  }

  var i = collision();
      
  for (var i = 0; i < enemyBalls.length; i++){
    push();
    fill('rgba(255, 255, 255, 0.7)');
    enemyBalls[i].show();
    enemyBalls[i].update();
    pop();
  }
  
  if (playerBallArr.length > 0) {
    // push()
    // fill()
    playerBallArr[0].show();
    playerBallArr[0].update();
  }

  // --------------Tests----------------
  // console.log(balls.length);
  // console.log(frameRate())
  // console.log(enemyBalls[0].pos.x);
  // console.log(playerBall.pos.x);
  // console.log(playerBall.pos.y);
  // console.log(playerBall.r);
}