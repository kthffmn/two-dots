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

Board.prototype.randomColor = function() {
  var colors = ["blue", "green", "purple", "red", "yellow"];
  return sample(colors);
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
  this.dragging = true;
  var that = this;
  $(".dot").mousedown(function() {
    var x = $(this).data("xaxis");
    var y = $(this).data("yaxis");
    var dot = that.findDot([ x, y ]);
    dot.activate();
  });
}

Board.prototype.addMouseUp = function() {
  this.dragging = false;
  var that = this;
  $(".dot").mouseup(function() {
    if (that.selectedDots.length > 1) {
      that.destroyDots();
    } else {
      that.resetBoard();
    }
  });
}

Board.prototype.lastSelectedDot = function() {
  return this.selectedDots[this.selectedDots.length - 1];
}

Board.prototype.addHover = function() {
  var that = this;
  $(".dot").mouseover(function() {
    if (that.validDrag(this)) {

    }
  });
}

Board.prototype.validDrag = function(element) {
  return $(element).hasClass(this.color) && this.isNeighbor(element) && this.dragging
}

Board.prototype.isNeighbor = function(element) {
  var x = element.data("xaxis");
  var y = element.data("yAxis");
  var dot = this.findDot([ x, y ]);
  return this.lastSelectedDot().neighbors().indexOf(dot) > -1;
}

Board.prototype.resetBoard = function() {
  this.selectedDots.forEach(function(dot) {
    dot.deactivate();
  });
  this.selectedDots = [];
}

Board.prototype.destroyDots = function() {
  this.selectedDots.forEach(function(dot) {
    dot.destroy();
  });
  this.selectedDots = [];
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

Board.prototype.findDot = function(coordinates) {
  var xAxis = coordinates[0];
  var yAxis = coordinates[1];
  if (xAxis >= 0 && yAxis >= 0 && xAxis < this.width && yAxis < this.width) {
    return this.dots[xAxis][yAxis];
  }
  return false;
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