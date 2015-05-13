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

$.fn.disableSelection = function() {
  return this
    .attr('unselectable', 'on')
    .css('user-select', 'none')
    .on('selectstart', false);
};

function deleteAt(array, index) function() {
  array.splice(index, 1);
}
