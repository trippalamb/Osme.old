Array.prototype.plus = function(a) {
    var b = [];
    if(a.length !== this.length){return "ERROR lengths not equal";}

    for(var i = 0; i < this.length; i++){
        b[i] = this[i] + a[i];
    }
    return b;
};

Array.prototype.minus = function(a) {
    if(a.length !== this.length){return "ERROR lengths not equal";}

    for(var i = 0; i < this.length; i++){
        b[i] = this[i] - a[i];
    }
    return b;
};

Array.prototype.scalarPlus = function(a) {
    var b = [];

    for(var i = 0; i < this.length; i++){
        b[1] = this[i] + a;
    }
    return b;
};

Array.prototype.scalarMinus = function(a) {
    var b = [];

    for(var i = 0; i < this.length; i++){
        b[1] = this[i] - a;
    }
    return b;
};

Array.prototype.scalarMultiply = function(a){
    var b = [];
    for(var i = 0; i <this.length; i++){
        b[i] = this[i] * a;
    }
    return b;
}

Array.prototype.scalarDivide = function(a){
    var b = [];
    for(var i = 0; i <this.length; i++){
        b[i] = this[i] / a;
    }
    return b;
}

Array.prototype.scalarModulus = function(a){
    var b = [];
    for(var i = 0; i <this.length; i++){
        b[i] = this[i] % a;
    }
    return b;
}

Array.prototype.contains = function(a){
    for(var i = 0; i <this.length; i++){
        if(this[i] === a){
            return true;
        }
    }
    return false;
}

Array.prototype.eq = function(a){
    if(this.length !== a.length){return false;}
    for(var i = 0; i < this.length; i++){
        if(this[i] !== a[i]){
            return false;
        }
    }
    return true;
}

Array.prototype.ne = function(a){
    if(this.length !== a.length){return true;}
    for(var i = 0; i <this.length; i++){
        if(this[i] === a[i]){
            return false;
        }
    }
    return true;
}
module.exports = Array;
