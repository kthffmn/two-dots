var COLORS = ["blue", "green", "purple", "red", "yellow"];

function Board() {
  this.dots = [];
  this.score = 0;
}

Board.prototype.randomColor = function() {
  var color = COLORS[Math.floor(Math.random()*COLORS.length)];
  return color;
}

Board.prototype.makeBoard = function() {
  var html = this.makeHTML();
  $("#board").html(html);
}

Board.prototype.makeHTML = function() {
  var html = "<table class=\"table\">";
  var htmlEnd = "</table>";
  var yAxis = 0;
  while (yAxis < 5) {
    html += this.makeRow(yAxis);
    yAxis += 1;
  }
  return html + htmlEnd;
};

Board.prototype.makeRow = function(yAxis) {
  var html = "<tr>";
  var htmlEnd = "</tr>";
  var xAxis = 0;
  var rowDots = [];
  while (xAxis < 5) {
    var dot = this.makeDot(xAxis, yAxis);
    rowDots.push(dot);
    html += dot.html();
    xAxis += 1;
  }
  this.dots.push(rowDots);
  return html + htmlEnd;
};

Board.prototype.makeDot = function(xAxis, yAxis) {
  var color = this.randomColor;
  var coordinates = [xAxis, yAxis];
  var dot = new Dot(coordinates, color, this);
  this.dots.push(dot);
  return dot;
};