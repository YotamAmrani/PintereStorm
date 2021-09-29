/**
 *  The method compares an Array to a given array.
 * @returns true - In case the arrays are identical, false - elsewhere.
 */
Array.prototype.diff = function(arr2) {
  var ret = [];
  this.sort();
  arr2.sort();
  for (var i = 0; i < this.length; i += 1) {
    if (arr2.indexOf(this[i]) > -1) {
      ret.push(this[i]);
    }
  }
  return ret;
};

/**
 *  The method compares an Array to a given array.
 * @returns true - In case the arrays are identical, false - elsewhere.
 */
Array.prototype.identical = function(arr2) {
  var ret = [];
  this.sort();
  arr2.sort();
  for (var i = 0; i < this.length; i += 1) {
    if (arr2.indexOf(this[i]) > -1) {
      ret.push(this[i]);
    }
  }
  if (ret.length == arr2.length) {
    return true;
  }
  return false;
};

/**
 * The function gets a dictinary of items bundeled to their graph weight and
 * sort them according to their weights.
 * @param {*} dist dictionary to sort, based on distance
 * @returns sorted items tuples list
 */
function sortDist(dist) {
  // Create items array
  var items = Object.keys(dist).map(function(key) {
    return [key, dist[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return first[1] - second[1];
  });
  return items;
}
