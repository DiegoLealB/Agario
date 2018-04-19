function Ball(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0,0);

  this.update = function() {
    var newVel = createVector(mouseX-width/2, mouseY-height/2);
    
    if ((mouseX >= 0 && mouseX <= width) && (mouseY >= 0 && mouseY <= height)) {
      if (p5.Vector.mag(newVel) <= 200) {
        newVel.setMag(p5.Vector.mag(newVel) / 50);
      } else {
          newVel.setMag(4);
      }
    } else {
      newVel.setMag(0);
    }

    if (playerBall.pos.x - playerBall.r * 0.75 < -boundries && mouseX < width/2) {
      newVel.setMag(0);
    } else if (playerBall.pos.x + playerBall.r * 0.75 > boundries && mouseX > width/2) {
      newVel.setMag(0);
    } else if (playerBall.pos.y - playerBall.r * 0.75 < -boundries && mouseY < height/2) {
      newVel.setMag(0);
    } else if (playerBall.pos.y + playerBall.r * 0.75 > boundries && mouseY > height/2) {
      newVel.setMag(0);
    }

    if (playerBall.r < 1) {
      newVel.setMag(0);
      rSlider.value(Math.floor(Math.random() * 255));
      gSlider.value(Math.floor(Math.random() * 255));
      bSlider.value(Math.floor(Math.random() * 255));
      aSlider.value((Math.random() * 10) / 10);
    } 
    if ((playerBall.r > 300 && playerBall.r < 500) || enemyBalls.length === 0) {
      alert("You Win!");
      playerBall.r = 1000;
    }
    
    this.vel.lerp(newVel, 0.1);
    this.pos.add(this.vel);
  }

  this.eats = function(other) {
    if (this.r > other.r * 1.15) {
      var d = p5.Vector.dist(this.pos, other.pos);
      if (d < this.r + other.r * 0.1) {
        var sum = PI * this.r * this.r + PI * other.r * other.r;
        this.r = sqrt(sum / PI);
        return true;
      } else {
        return false;
        } 
    } 
  } 
  

  this.show = function() {
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}