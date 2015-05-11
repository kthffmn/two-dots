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
  var coords = [];
  var neighborCoords = [this.vertNBCoords(), this.diagAndHorzNBCoords()];
  neighborCoords.forEach(function(arrays) {
    arrays.forEach(function(coordinates) {
      coords.push(coordinates);
    });
  });
  return coords;
};

Dot.prototype.vertNBCoords = function() {
  var xCoord = this.coordinates[0];
  var yCoord = this.coordinates[1];
  return [[xCoord -1, yCoord],[xCoord + 1, yCoord]];
};

Dot.prototype.diagAndHorzNBCoords = function() {
  var xCoord = this.coordinates[0];
  var yCoord = this.coordinates[1];
  return [
    [xCoord -1, yCoord - 1],
    [xCoord -1, yCoord + 1],
    [xCoord + 1, yCoord - 1],
    [xCoord + 1, yCoord + 1],
    [xCoord, yCoord - 1],
    [xCoord, yCoord + 1]
  ];
};