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

$.fn.disableSelection = function() {
  return this
    .attr('unselectable', 'on')
    .css('user-select', 'none')
    .on('selectstart', false);
};