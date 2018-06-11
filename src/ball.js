function Ball(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0,0);

  this.update = function() {
    var newVel = createVector(mouseX-width/2, mouseY-height/2);
    
    if ((mouseX >= 0 && mouseX <= width) && (mouseY >= 0 && mouseY <= height)) {
      if (p5.Vector.mag(newVel) <= 200) {
        newVel.setMag(p5.Vector.mag(newVel) / 25);
      } else {
          newVel.setMag(8);
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
    } else {
      cursor(CROSS);
    }

    if (playerBall.r < 1) {
      newVel.setMag(0);
    } 
   
    if ((playerBall.r > 300 && playerBall.r < 500) || enemyBalls.length === 0) {
      alert("You Win!");
      playerBall.r = 501;
      newVel.setMag(15);
    }
    
    this.vel.lerp(newVel, 0.1);
    this.pos.add(this.vel);
  }

  this.eats = function(other) {
    if (this.r > other.r * 1.10) {
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
    push();
    translate(this.pos.x, this.pos.y);
    var xOff = 0;
    var yOff = 0;
    
    beginShape();
    for (var a = 0; a < TWO_PI; a += 0.1) {
      var offset = map(noise(xOff, yOff), 0, 1, 0, this.r / 10);
      var r = this.r + offset;
      var x = r * cos(a);
      var y = r * sin(a);
      vertex(x, y);
      xOff += random(0, 0.25);
      yOff += random(0, 0.25);
    }
    endShape();
    pop();
    stroke(255);
    strokeWeight(1);
  }
}