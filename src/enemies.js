function Enemy(x, y, r, color) {
  this.pos = createVector(x, y);
  this.r = r;
  this.color = color;
  this.vel = createVector(0,0);

  this.update = function() {
    var newVel = createVector(playerBall.pos - this.pos);
    
    var boundries = 1000;
    if (this.pos.x - this.r * 0.75 < -boundries) {
      newVel = -newVel
    } else if (this.pos.x + this.r * 0.75 > boundries) {
      newVel = -newVel
    } else if (this.pos.y - this.r * 0.75 < -boundries) {
      newVel = -newVel
    } else if (this.pos.y + this.r * 0.75 > boundries) {
      newVel = -newVel
    }

    this.eats = function(other) {
      if (this.r > other.r * 1.15) {
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r * 0.1) {
          var sum = Math.PI * this.r * this.r + Math.PI * other.r * other.r;
          this.r = sqrt(sum / Math.PI);
          return true;
        } else {
          return false;
          } 
      } 
    } 
    this.vel.lerp(newVel, 0.1);
    this.pos.add(this.vel)
  }
  

  this.show = function() {
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    push();
    fill(pickColor(color));
  }
}

// var enemies = new Ball();
// var enemyVel = (playerBall.pos - enemyBalls.pos);
//     for (var i = 0; i < enemyBalls.length; i++){
//     enemyBalls.vel = enemyVel;
//     if (enemyBalls.r > playerBall.r){
//       enemyBalls.vel.add(enemyBalls.vel);
//     } }