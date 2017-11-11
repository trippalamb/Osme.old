var Expression = Expression || {};
var Utils = require('./Utilities.js');

(function () {
    Expression.letter = /[a-zA-z_]/;
    Expression.number = /[\d\.]/;
    Expression.paren = /\(/;
    Expression.op = /\+\-/;
    Expression.variable = /([a-zA-Z_](?:\w+)?)/;
    Expression.variable = /([\+-])?(?:(\d+(?:[\.][\d]*)?)|([\.][\d]+)|(\d+[\.]))(i)?/;

    var Expression = function (content) {

        this.structure = "expression";
        this.terms = [];
        this.addOps = [];

        //var i = 0;
        var m;
        var l;
        var optype;
        var inner;

        while (content.length > 0) {
            var c = content[i];

            if (Expression.letter.test(c)) {
                m = content.match(Expression.variable);
                this.terms.push(m[1]);
                l = m[1].length;


            }
            else if (Expression.number.test(c)) {
                m = content.match(Expression.number);
                this.terms.push(m[1]);
                l = m[1].length;
            }
            else if (Expression.paren.test(c)) {
                end = Utils.findMatchingBracket(content, 0, '(');
                inner = content.slice(0, end);
                this.terms.push(inner);
                l = inner.length;
            }
            else if (Expression.op.test(c)) {
                m = content.match(Expression.variable);
                optype = "binary"; //TODO: add logic to determine this
                this.addOps.push(new Operator(c, optype));
                l = 1;
            }
            else if (c === " ") {
                l = 1;
            }
            else{
                console.log("error in expression look ahead");
            }
            content = content.slice(l);
        }


    }
})();


module.exports = Expression;
