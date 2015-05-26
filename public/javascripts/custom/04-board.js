function Board(width) {
  if (width > 12 || width < 2) alert("Board size must be between 2 and 12");
  this.width = width;
  this.columnSize = Math.floor(12/width);
  this.dots = [];
  this.selectedColor = "not yet defined";
  this.selectedDots = [];
  this.dragging = false;
  this.redrawTheseColumns = [];
  this.blueScore = 0;
  this.greenScore = 0;
  this.purpleScore = 0;
  this.redScore = 0;
  this.yellowScore = 0;
  this.squareCompleted = false;
  this.disabledColor = false;
  this.colors = ["blue", "green", "purple", "red", "yellow"];
}

Board.prototype.score = function() {
  return this.blueScore + this.greenScore + this.purpleScore + this.redScore + this.yellowScore;
}

Board.prototype.makeBoard = function() {
  var html = this.makeHTML();
  var board = this;
  $("#board").fadeOut(1000, function() {
    $("#board").html(html);
    $("#score").html(board.score());
    $("#board").fadeIn(1000, function() {
      board.addListeners();
    });
  });
}

Board.prototype.createNewDot = function(x) {
  var dot = this.makeDot(x, 0);
  this.dots[x].unshift(dot);
  if (!elementIncluded(this.redrawTheseColumns, x)) {
    this.redrawTheseColumns.push(x);
  }
}

Board.prototype.addListeners = function() {
  this.removeAllListeners();
  this.addMouseDown();
  this.addMouseUp();
  this.addHover();
}

Board.prototype.removeAllListeners = function() {
  $('.dot').unbind();
}

Board.prototype.addMouseDown = function() {
  var board = this;
  $(".dot").mousedown(function() {
    var dot = board.turnjQueryToDot($(this));
    if (dot) dot.activate();
    board.dragging = true;
  });
}

Board.prototype.addMouseUp = function() {
  var board = this;
  $("body").mouseup(function() {
    if (board.selectedDots.length > 1) {
      board.destroyDots();
    } else {
      board.resetBoard();
    }
    board.dragging = false;
  });
}

Board.prototype.deactivateLastDot = function() {
  var lastDot = getLastElement(this.selectedDots);
  lastDot.deactivate();
  this.selectedDots.pop();
}

Board.prototype.secondToLast = function(dot) {
  var secondToLastDot = getSecondToLastElement(this.selectedDots);
  return secondToLastDot == dot;
}

Board.prototype.addHover = function() {
  var board = this;
  $(".dot").mouseenter(function() {
    if (board.dragging) {
      var dot = board.turnjQueryToDot($(this));
      if (board.validDrag(dot)) {
        dot.activate();
      } else if (board.secondToLast(dot) && !board.squareCompleted) {
        board.deactivateLastDot();
      } else if (board.rightColor(dot) && board.isNeighbor(dot) && board.completeSquare(dot)) {
        board.selectedDots.push(dot);
        board.squareCompleted = true;
        console.log("square!");
      }
    }
  });
}

Board.prototype.completeSquare = function(dot) {
  if (elementIncluded(this.selectedDots, dot)) {
    var tempDots = this.selectedDots;
    tempDots.push(dot);
    var index = tempDots.indexOf(dot);
    var circle = tempDots.slice(index, tempDots.length);
    if (circle.length >= 5) return true;
  }
  return false;
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
  return !elementIncluded(this.selectedDots, dot);
}

Board.prototype.sameDot = function(dotA, dotB) {
  return dotA.coordinates[0] == dotB.coordinates[0] && dotA.coordinates[1] == dotB.coordinates[1];
}

Board.prototype.resetBoard = function() {
  this.selectedDots.forEach(function(dot) {
    dot.deactivate();
  });
  this.selectedDots = [];
  this.selectedColor = "none";
}

Board.prototype.destroyDots = function() {
  if (this.squareCompleted) {
    var color = this.selectedColor;
    var dotsOfColor = this.findAllByColor(color);
    dotsOfColor.forEach(function(dot) {
      dot.destroy();
    });
    this.disabledColor = color;
  } else {
    this.selectedDots.forEach(function(dot) {
      dot.destroy();
    });
  }
  this.selectedDots = [];
  this.selectedColor = "none";
  this.disabledColor = false;
  this.squareCompleted = false;
  this.redrawColumns();
  this.updateScore();
  this.addListeners();
}

Board.prototype.updateScore = function() {
  $(".blue-score").html(this.blueScore);
  $(".green-score").html(this.greenScore);
  $(".purple-score").html(this.purpleScore);
  $(".red-score").html(this.redScore);
  $(".yellow-score").html(this.yellowScore);
  $("#score").html(this.score());
}

Board.prototype.redrawColumns  = function() {
  var board = this;
  this.redrawTheseColumns.forEach(function(x) {
    var column = board.dots[x];
    var newHTML = "";
    column.forEach(function(dot) {
      newHTML += dot.html();
    });
    $("#column-" + x).html(newHTML);
  });
}

Board.prototype.makeHTML = function() {
  var html = "<div class=\"row board\">";
  var htmlEnd = "</div>";
  for (var xAxis = 0; xAxis < this.width; xAxis++ ) {
    html += this.makeColumn(xAxis);
  }
  return html + htmlEnd;
};

Board.prototype.makeColumn = function(xAxis) {
  var html = "<div id=\"column-" + xAxis + "\" class=\"col-xs-" +  this.columnSize + " col-sm-" + this.columnSize + " col-md-" + this.columnSize + "\">";
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
  var board = this;
  coords.forEach(function(coordinates) {
    var found = board.findDot(coordinates);
    if (found) foundDots.push(found);
  });
  return foundDots;
}

Board.prototype.findDot = function(coordinates) {
  var x = coordinates[0];
  var y = coordinates[1];
  if (this.validCoordinates(x,y)) {
    return this.dots[x][y];
  } else {
    return false;
  }
};

Board.prototype.findAllByColor = function(color) {
  var container = [];
  this.dots.forEach(function(column){
    column.forEach(function(dot) {
      if (dot.color == color) container.push(dot);
    });
  });
  return container;
};

Board.prototype.validCoordinates = function(x,y) {
  return x >= 0 && y >= 0 && x < this.width && y < this.width;
}

Board.prototype.randomColor = function() {
  if (this.disabledColor) {
    var colours = [];
    this.colors.forEach(function(color) {
      if (!(color == this.disabledColor)) {
        colours.push(color);
      }
    });
    return sample(colours);
  } else {
    return sample(this.colors);
  }
}
