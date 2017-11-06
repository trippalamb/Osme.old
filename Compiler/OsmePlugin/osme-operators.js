var Operators = Operators || {};

(function(){

    var os = require('os');
    var eol = new RegExp(os.EOL, "g");

    //current valid values for type are "unary", "binary"

    Operators.construct = function(opr) {
        opr = opr.trim();
        if (opr === ".") {
            return new Operators.Concatenation();
        }
    }
    
    Operators.Concatenation = function(){
        this.str = ".";
        this.type = "binary";
        this.name = "concatenation"
    }

    Operators.Addition = function(){
        this.str = "+";
        this.type = "binary";
        this.name = "addition";
    }

    Operators.Subtraction = function(){
        this.str = "-";
        this.type = "binary";
        this.name = "subtraction";
    }
    
    Operators.Multiplication = function(){
        this.str = "*";
        this.type = "binary";
        this.name = "multiplication";
    }
    
    Operators.Division = function(){
        this.str = "/";
        this.type = "binary";
        this.name = "division";
    }

    Operators.Modulus = function(){
        this.str = "%";
        this.type = "binary";
        this.name = "modulus";
    }

    Operators.Equivalency = function(){
        this.str = "==";
        this.type = "binary";
        this.name = "equivalency";
    }

    Operators.Not = function(){
        this.str = "<>";
        this.type = "unary";
        this.name = "not";
    }



})();

module.exports = Operators
