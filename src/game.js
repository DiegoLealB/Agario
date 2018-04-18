var playerBall, enemyBall, grid;
var playerBallArr = [];
var enemyBalls = [];
var balls = [];
var grids = [];
var zoom = 0.50; //Changed default zoom here for zoom in effect when loading the game
var ballQuantity = 100;
var worldScale = 1.667; //Adjust this by whatever you want the play area to be * 600, also need to change boundries var
var enemiesQuantity = 15;

function startGame() {
  enemyBalls.splice(0, enemyBalls.length);
  playerBallArr.splice(0, 1);
  playerBall = new Ball(0, 0, 100);
  playerBallArr.push(playerBall);
  var counter = 0;
  
  while (enemyBalls.length < enemiesQuantity) {
    var isOverlapping = false;
    enemyBall = '';
    enemyBall = new Enemy(random(-width * worldScale, width * worldScale), random(-height * worldScale, height * worldScale), pickSize(), pickColor('random'));
    
    for (var i = 0; i < enemyBalls.length; i++) {
      var x = playerBall.x - enemyBall.x;
      var y = playerBall.y - enemyBall.y;
      var d = sqrt(x * x + y * y);
      if (d < enemyBall.r + playerBall.r){
        isOverlapping = true;
        break;
      }
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
    var x = random(-width * worldScale, width * worldScale); //boundries / 600 = worldScale
    var y = random(-height * worldScale, height * worldScale);
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
  var size = Math.floor(Math.random() * 150 + 32)
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

function drawGrid() {
  var w = 200;
  var rows = floor(600 * worldScale * 2 / w);
  var cols = floor(600 * worldScale * 2 / w);
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      var grid = new Grid(x, y, w);
      grids.push(grid);
    }
  }
}

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.style('display', 'block');
  canvas.style('margin', '20px auto');
  canvas.style('border', '1px solid black');  

  startGame();
  buttonStyles();
  drawGrid();

  // frameRate(60);
}

function draw() {
  background(255);
  translate(width/2, height/2); //Set canvas origin to center of the canvas
  if (playerBall.r !== 0) {
    var newZoom = 64 / playerBall.r; //Update zoom depending on playerBall size
  } else {
    newZoom = 0.3;
  }
  zoom = lerp(zoom, newZoom, 0.02);
  scale(zoom);
  translate(-playerBall.pos.x, -playerBall.pos.y); //Moving the canvas opposite the position of the mouse pointer
  
  for (var i = 0; i < grids.length; i++) {
    grids[i].show();
  }

  for (var i = enemyBalls.length - 1; i >= 0; i--) {
    if (playerBall.eats(enemyBalls[i])){
      enemyBalls.splice(i, 1);
    } else if (enemyBalls[i].eats(playerBall)){
      playerBallArr.splice(0, 1);
    }
    // for (var j = enemyBalls.length - 1; j >= 0; j--) {
    //   if (enemyBalls[j].eats(enemyBalls[i])) {
    //     enemyBalls[i].splice(i, 1);
    //     for (var k = 0; k < enemiesQuantity; k++) {
    //       enemyBalls.push(enemyBall = new Enemy(random(-width * worldScale, width * worldScale), random(-height * worldScale, height * worldScale), pickSize(), pickColor('random')));
    //     }
    //   }
    // }
  }

  for (var i = balls.length-1; i >= 0; i--) {
    balls[i].show();
    if (playerBall.eats(balls[i])) {
      balls.splice(i, 1);
      for (var j = 0; j < ballQuantity - balls.length; j++) {
        balls.push(new Ball(random(-width * worldScale, width * worldScale), random(-height * worldScale, height * worldScale), 16));
      }
    }
    for (var k = enemyBalls.length - 1; k >= 0; k--) {
      if (enemyBalls[k].eats(balls[i])) {
        balls.splice(i ,1);
        for (var j = 0; j < ballQuantity - balls.length; j++) {
          balls.push(new Ball(random(-width * worldScale, width * worldScale), random(-height * worldScale, height * worldScale), 16));
        }
      }
    }
  }
    //   else if (enemyBall.eats(balls[i])) {
    //     balls.splice(i, 1);
    //     for (var j = 0; j < ballQuantity - balls.length; j ++) {
    //       balls.push(new Ball(random(-width * worldScale, width * worldScale), random(-height * worldScale, height * worldScale), 16));
    //     }
    // }
    
    // else if (playerBall.eats(enemyBalls[j])){
    //   enemyBalls.splice(j, 1);
    //   break;
    // } else if (enemyBalls[j].eats(playerBall)){
    //   console.log("You died");
    //   playerBallArr.splice(0, 1);
    // }
      
      
  for (var i = 0; i < enemyBalls.length; i++){
    enemyBalls[i].show();
    enemyBalls[i].move(playerBall);
  }
  
  if (playerBallArr.length > 0) {
    playerBallArr[0].show();
    playerBallArr[0].update();
  }
  // fill(pickColor('red')) //Makes everything same color;
  
  // for (var i = 0; i < enemyBalls.length; i++) {
  //   enemyBalls[i].show();
  //   enemyBalls[i].update();
  // }
  

  // --------------Tests----------------
  // console.log(balls.length);
  // console.log(frameRate())
  // console.log(enemyBalls.length);
  // console.log(playerBall.pos.x);
  // console.log(playerBall.pos.y);
  // console.log(playerBall.r);

  
}