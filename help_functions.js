Array.prototype.diff = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    } 
    return ret;
};

Array.prototype.identical = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    } 
    if(ret.length == arr2.length){
        return true;
    }
    return false;
};


function sort_dist(dist){
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

