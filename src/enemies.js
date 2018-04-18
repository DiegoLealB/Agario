function Enemy(x, y, r, color) {
  this.pos = createVector(x, y);
  this.r = r;
  this.color = color;
  this.vel = createVector(0,0);

  this.update = function() {
    // var newVel = createVector(this.pos - this.pos);
    
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

    // this.vel.lerp(newVel, 0.1);
    // this.pos.add(this.vel)
  }

  this.eats = function(other) {
    if (this.r > other.r * 1.15) {
      var d = p5.Vector.dist(this.pos, other.pos);
      if (d < this.r + other.r * 0.1) {
        var sum = PI * this.r * this.r + PI * other.r * other.r;
        this.r = sqrt(sum / PI);
        other.r = 0;
        
        // if (this.r < 300) {
        //   return true;
        // } else {
        //   return false;
        // }
      } else {
        return false;
        } 
    }   
  }

  this.move = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (this.r > other.r * 1.15){
      if (d < this.r * 2 + other.r * 3){
        this.pos.add((other.pos.x - this.pos.x)/300, (other.pos.y - this.pos.y)/300);
      } 
    // } else {
    //   this.pos.add((this.pos.x - other.pos.x)/300, (this.pos.y - other.pos.y)/300);
    //   if ((this.pos.x + this.r < -boundries || this.pos.x + this.r > boundries) || (this.pos.y + this.r < -boundries || this.pos.y + this.r > boundries)){
    //     this.pos.sub((this.pos.x)/300, (this.pos.y)/300);
    //   }
    }
  }

  this.show = function() {
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    push();
    fill(pickColor('rgb(200, 50, 150)'));
  }
}

// var enemies = new Ball();
// var enemyVel = (playerBall.pos - enemyBalls.pos);
//     for (var i = 0; i < enemyBalls.length; i++){
//     enemyBalls.vel = enemyVel;
//     if (enemyBalls.r > playerBall.r){
//       enemyBalls.vel.add(enemyBalls.vel);
//     } }