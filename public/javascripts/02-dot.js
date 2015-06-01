function Dot(coordinates, color, board) {
  this.coordinates = coordinates;
  this.color = color;
  this.board = board;
  this.disabled = false;
  this.bounce = false
}

Dot.prototype.deleteThisFromArray = function() {
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  deleteAt(this.column(), y);
}

Dot.prototype.adjustAboveDotCoordinates = function() {
  this.aboveDots().forEach(function(dot) {
    dot.coordinates[1] += 1;
  });
}

Dot.prototype.aboveDots = function() {
  var columnDots = this.column();
  var y = this.coordinates[1];
  return columnDots.filter(function(dot) {
    return dot.coordinates[1] < y;
  });
}

Dot.prototype.fillInSpaceLeft = function() {
  var x = this.coordinates[0];
  this.board.createNewDot(x);
}

Dot.prototype.destroy = function() {
  this.disabled = true;
  eval("this.board." + this.color + "Score += 1");
  this.redrawThisColumn();
  this.adjustAboveDotCoordinates();
  this.deleteThisFromArray();
  this.fillInSpaceLeft();
};


Dot.prototype.redrawThisColumn = function() {
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  if (!(x in this.board.redrawTheseColumns) || this.board.redrawTheseColumns[x] < y) {
    this.board.redrawTheseColumns[x] = y;
  }
}

Dot.prototype.explode = function() {
  var domDot = this.findDOMObject();
  var icon = domDot.children().first()
  icon.effect("explode", { pieces: 16 });
}

Dot.prototype.column = function() {
  var x = this.coordinates[0];
  return this.board.dots[x];
}

Dot.prototype.html = function() {
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  var html = "<div data-xaxis=\"" + x + "\" data-yaxis=\"" + y + "\" class=\"row dot ";
  var htmlEnd = "\"><i class=\"fa fa-circle fa-2x\"></i></div>";
  if (this.bouncy()) {
    return html + "bounce " + this.color + htmlEnd;
  } else {
    return html + this.color + htmlEnd;
  }
}

Dot.prototype.bouncy = function() {
  var x = this.coordinates[0];
  var y = this.coordinates[1];
  return this.board.redrawTheseColumns[x] >= y;
}

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