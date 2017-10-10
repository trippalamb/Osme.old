Number.prototype.matrixPlus = function(a) {
    var b = [];

    for(var i = 0; i < a.length; i++){
        b[i] = this + a[i];
    }
    return b;
};

Number.prototype.matrixMinus = function(a) {
    var b = [];

    for(var i = 0; i < a.length; i++){
        b[i] = this - a[i];
    }
    return b;
};

Number.prototype.matrixMultiply = function(a) {
    var b = [];

    for(var i = 0; i < a.length; i++){
        b[i] = this * a[i];
    }
    return b;
};

Number.prototype.matrixDivide = function(a) {
    var b = [];

    for(var i = 0; i < a.length; i++){
        b[i] = this / a[i];
    }
    return b;
};

Number.prototype.matrixModulus = function(a) {
    var b = [];

    for(var i = 0; i < a.length; i++){
        b[i] = this % a[i];
    }
    return b;
};

module.exports = Number;
