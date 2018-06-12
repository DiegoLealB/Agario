function Enemy(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0, 0);

  this.update = function () {
    this.move(playerBall);
    this.move(enemyBall);
  }

  this.eats = function (other) {
    if (this.r > other.r * 1.15) {
      var d = p5.Vector.dist(this.pos, other.pos);
      if (d < this.r + other.r * 0.1) {
        var sum = PI * this.r * this.r + PI * other.r * other.r;
        this.r = sqrt(sum / PI);
        other.r = 0;
      } else {
        return false;
      }
    }
  }

  this.move = function (other) {
    let d = p5.Vector.dist(this.pos, other.pos);
    if (this.r > other.r * 1.10) {
      if (d < this.r * 4 + other.r * 3) {
        this.pos.add((other.pos.x - this.pos.x) / this.r, (other.pos.y - this.pos.y) / this.r);
      } 
    } else {
      if (d < this.r * 4 + other.r * 3) {
        this.pos.sub((other.pos.x - this.pos.x) / 2 / this.r, (other.pos.y - this.pos.y) / this.r);
      }
    }

    if (this.pos.x - this.r * 0.75 < -boundries) {
      this.pos.x += 5;
    } else if (this.pos.x + this.r * 0.75 > boundries) {
      this.pos.x -= 5;
    } else if (this.pos.y - this.r * 0.75 < -boundries) {
      this.pos.y += 5;
    } else if (this.pos.y + this.r * 0.75 > boundries) {
      this.pos.y -= 5;
    }
  }

  this.show = function () {
    push();
    stroke(255);
    strokeWeight(2);
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
  }
}