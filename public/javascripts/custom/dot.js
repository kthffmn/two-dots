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
  var htmlEnd = "\"><i class=\"fa fa-circle fa-2x\"></i></td>";
  return htmlStart + this.color + htmlEnd;
};

Dot.prototype.neighbors = function() {
  var coords = this.neighborCoordinates();
  return this.board.findDots(coords);
};

Dot.prototype.neighborCoordinates = function() {
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  return [
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x + 1, y + 1],
    [x,     y - 1],
    [x,     y + 1],
    [x - 1, y    ],
    [x + 1, y    ]
  ];
};

Dot.prototype.aboveDots = function() {
  var aboveCoords = this.aboveCoordinates();
  return this.board.findDots(aboveCoords);
};

Dot.prototype.aboveCoordinates = function() {
  var coords = [];
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  var max = this.board.width;
  for (y; y < max; y ++) {
    
  }
  debugger;
};
