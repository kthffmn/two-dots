function sample(list) {
  var random = list[Math.floor(Math.random()*list.length)];
  return random;
}

function elementIncluded(list, element) {
  return list.indexOf(element) > -1;
}

function getLastElement(list) {
  return list[list.length - 1];
}