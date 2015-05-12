function Dot(coordinates, color, board) {
  this.coordinates = coordinates;
  this.color = color;
  this.board = board;
}

Dot.prototype.destroy = function() {
  this.board.score += 1;
  this.aboveDots().forEach(function(dot) {
    var x = dot.coordinates[0];
    var y = dot.coordinates[1];
    // todo: delete this this.board.dots[y][x]

    this.board.dots[y + 1].push()
    dot.coordinates = [x, y + 1];
  });
  // todo: move other dots down
  // todo: delete this.findDOMObject() from DOM
};

Dot.prototype.html = function() {
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  var html = "<div data-xaxis=\"" + x + "\" data-yaxis=\"" + y + "\" class=\"row dot ";
  var htmlEnd = "\"><i class=\"fa fa-circle fa-2x\"></i></div>";
  return html + this.color + htmlEnd;
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
  var y = this.coordinates[1] - 1;
  for (y; y >= 0; y--) coords.push([this.coordinates[0], y]);
  return coords
};

Dot.prototype.findDOMObject = function() {
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  var selector = '*[data-xaxis="'+ x + '"][data-yaxis="' + y + '"]';
  var dot = $(selector);
  return $(dot);
}

Dot.prototype.activate = function() {
  var visibleDot = this.findDOMObject();
  visibleDot.addClass("active");
  this.board.selectedColor = this.color;
  this.board.selectedDots.push(this);
}

Dot.prototype.deactivate = function() {
  var visibleDot = this.findDOMObject();
  visibleDot.removeClass("active");
}