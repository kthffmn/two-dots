function sample(array) {
  var random = array[Math.floor(Math.random()*array.length)];
  return random;
}

function elementIncluded(array, element) {
  return array.indexOf(element) > -1;
}

function getLastElement(array) {
  return array[array.length - 1];
}

function deleteAt(array, index) {
  array.splice(index, 1);
}
