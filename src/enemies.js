function Enemy(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0,0);

  this.update = function() {
    this.move(playerBall);
    this.move(enemyBall);
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
      if (d < this.r * 3 + other.r * 3){
        this.pos.add((other.pos.x - this.pos.x)/this.r, (other.pos.y - this.pos.y)/this.r);
      } 
    } 
    else {
      if (d < this.r * 4 + other.r * 3) {
        this.pos.sub((other.pos.x - this.pos.x) * 2/ d, (other.pos.y - this.pos.y) * 2/ d);
      }      
    }

    if (this.pos.x - this.r * 0.75 < -boundries){
      this.pos.x+= 5;
    } else if (this.pos.x + this.r * 0.75 > boundries) {
      this.pos.x-= 5;
    } else if (this.pos.y - this.r * 0.75 < -boundries) {
      this.pos.y+= 5;
    } else if (this.pos.y + this.r * 0.75 > boundries) {
      this.pos.y-= 5;
    }
  }

  this.show = function() {
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}