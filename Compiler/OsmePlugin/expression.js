var Expression = Expression || {};

var Expression = function(content){

    var reg = /(.+)([\+\-])(.+)/;
    var m = content.match(reg);
    this.whole = m[0];
    this.structure = "expression";
    this.terms = [];
    this.addOps = [];
    if(m !== null){
        terms.push(m[0]);
    }


}

module.exports = Expression;
