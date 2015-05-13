function Dot(coordinates, color, board) {
  this.coordinates = coordinates;
  this.color = color;
  this.board = board;
}

Dot.prototype.removeThisFromArray = function() {
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  this.board.dots[x].splice(y, 1);
  this.adjustAboveDotCoordinates();
}

Dot.prototype.adjustAboveDotCoordinates = function() {
  this.board.dots[x].forEach(function(dot) {
    var x = dot.coordinates[0];
    var y = dot.coordinates[1];
    dot.coordinates = [x, y + 1]
  });
}

Dot.prototype.moveDownOne = function() {
  // todo: not sure, need to think on this...
}

Dot.prototype.dropDown = function() {
  this.moveOrRemoveThis();
  this.fillInSpaceLeft();
}

Dot.prototype.fillInSpaceLeft = function() {
  if (aboveDot) {
    aboveDot.dropDown();
  } else {
    this.board.createNewDot(x,y)
  }
}

Dot.prototype.moveOrRemoveThis = function() {
  if (atBottom) {
    this.removeThisFromArray();
  } else {
    this.moveDownOne();
  }
}

Dot.prototype.atBottom = function() {
  return this.coordinates[1] > this.board.width;
}

Dot.prototype.destroy = function() {
  this.board.score += 1;
  this.dropDown();
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
    [x,     y - 1],
    [x,     y + 1],
    [x - 1, y    ],
    [x + 1, y    ]
  ];
};

Dot.prototype.aboveDot = function() {
  var aboveCoords = this.aboveCoordinate();
  return this.board.findDot(aboveCoords);
};

Dot.prototype.aboveCoordinate = function() {
  return [this.coordinates[0], (this.coordinates[1] - 1)]
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