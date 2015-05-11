function Dot(coordinates, color, board) {
  this.coordinates = coordinates;
  this.color = color;
  this.board = board;
}

Dot.prototype.destroy = function() {
  this.board.score += 1;
};

Dot.prototype.html = function() {
  var htmlStart = "<td class=\"";
  var htmlEnd = "\"><i class=\"fa fa-circle\"></i></td>";
  return htmlStart + this.color() + htmlEnd;
};
