function Board(width) {
  if (width > 12 || width < 2) alert("Board size must be between 2 and 12");
  this.width = width;
  this.columnSize = Math.floor(12/width);
  this.dots = [];
  this.score = 0;
  this.selectedColor = "not yet defined";
  this.selectedDots = [];
  this.dragging = false;
}

Board.prototype.makeBoard = function() {
  var html = this.makeHTML();
  var that = this;
  $("#board").fadeOut(1000, function() {
    $("#board").html(html);
    $("#board").fadeIn(1000, function() {
      that.addListeners();
    });
  });
}

Board.prototype.addListeners = function() {
  this.addMouseDown();
  this.addMouseUp();
  this.addHover();
}

Board.prototype.addMouseDown = function() {
  var that = this;
  $(".dot").mousedown(function() {
    var dot = that.turnjQueryToDot($(this));
    dot.activate();
    that.dragging = true;
  });
}

Board.prototype.addMouseUp = function() {
  var that = this;
  $(".dot").mouseup(function() {
    if (that.selectedDots.length > 1) {
      that.destroyDots();
    } else {
      that.resetBoard();
    }
    that.dragging = false;
  });
}

Board.prototype.addHover = function() {
  var that = this;
  $(".dot").mouseenter(function() {
    console.log("1: why do I never get hit????");
    if (this.dragging) {
      console.log("2: why do I never get hit????");
      var dot = that.turnjQueryToDot($(this));
      if (that.validDrag(dot)) {
        dot.activate();
      }
    }
  }).mouseleave(function() {
    console.log("3: why do I never get hit????");
  });
}

Board.prototype.lastSelectedDot = function() {
  return getLastElement(this.selectedDots);
}

Board.prototype.turnjQueryToDot = function(element) {
  var x = $(element).data("xaxis");
  var y = $(element).data("yaxis");
  var dot = this.findDot([x,y]);
  return dot;
}

Board.prototype.validDrag = function(dot) {
  return this.rightColor(dot) && this.isNeighbor(dot) && this.notAlreadySelected(dot);
}

Board.prototype.rightColor = function(dot) {
  return dot.color == this.selectedColor;
}

Board.prototype.isNeighbor = function(dot) {
  var neighbors = this.lastSelectedDot().neighbors();
  return elementIncluded(neighbors, dot);
}

Board.prototype.notAlreadySelected = function(dot) {
  return elementIncluded(this.selectedDots, dot);
}

Board.prototype.resetBoard = function() {
  this.selectedDots.forEach(function(dot) {
    dot.deactivate();
  });
  this.selectedDots = [];
  this.selectedColor = "none";
}

Board.prototype.destroyDots = function() {
  this.selectedDots.forEach(function(dot) {
    dot.destroy();
  });
  this.selectedDots = [];
  this.selectedColor = "none";
  this.redrawBoard();
}

Board.prototype.redrawBoard  = function() {
  var html = this.getUpdatedHTML();
  $("#board").html(html);
  this.addListeners();
}

Board.prototype.getUpdatedHTML  = function() {
  // todo: make a method that will generate HTML based on the
  //       current this.dots() data
}

Board.prototype.makeHTML = function() {
  var html = "<div class=\"row\">";
  var htmlEnd = "</div>";
  for (var xAxis = 0; xAxis < this.width; xAxis++ ) {
    html += this.makeColumn(xAxis);
  }
  return html + htmlEnd;
};

Board.prototype.makeColumn = function(xAxis) {
  var html = "<div class=\"col-xs-" +  this.columnSize + " col-sm-" + this.columnSize + " col-md-" + this.columnSize + "\">";
  var htmlEnd = "</div>";
  var column = [];
  for (var yAxis = 0; yAxis < this.width; yAxis++ ) {
    var dot = this.makeDot(xAxis, yAxis);
    column.push(dot);
    html += dot.html();
  }
  this.dots.push(column);
  return html + htmlEnd;
};

Board.prototype.makeDot = function(xAxis, yAxis) {
  var color = this.randomColor();
  var coordinates = [xAxis, yAxis];
  var dot = new Dot(coordinates, color, this);
  return dot;
};

Board.prototype.findDots = function(coords) {
  var foundDots = [];
  var that = this;
  coords.forEach(function(coordinates) {
    var found = that.findDot(coordinates);
    if (found) foundDots.push(found);
  });
  return foundDots;
}

Board.prototype.findDot = function(coordinates) {
  var x = coordinates[0];
  var y = coordinates[1];
  if (this.validCoordinates(x,y)) return this.dots[x][y];
  return false;
};

Board.prototype.validCoordinates = function(x,y) {
  return x >= 0 && y >= 0 && x < this.width && y < this.width;
}

Board.prototype.randomColor = function() {
  var colors = ["blue", "green", "purple", "red", "yellow"];
  return sample(colors);
}
