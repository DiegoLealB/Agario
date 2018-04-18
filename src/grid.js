function Grid(x, y, w) {
  this.x = x;
  this.y = y;

  this.show = function() {
    this.w = w;
    var x = this.x * w - boundries;
    var y = this.y * w - boundries;
    push();
    stroke(181);
    line(x    , y    , x + w, y    );
    line(x + w, y    , x + w, y + w);
    line(x + w, y + w, x    , y + w);
    line(x    , y + w, x    , y    );
    pop();
  }
}