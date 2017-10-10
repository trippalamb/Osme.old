var OsmeMath = OsmeMath || {};

OsmeMath.sum = function(a){
    var sum = 0;
    for(var i = 0; i < a.length; i++){
        sum += a[i];
    }
    return sum;
}

module.exports = OsmeMath;
