var Operators = Operators || {};

(function(){

    var os = require('os');
    var eol = new RegExp(os.EOL, "g");

    //current valid values for type are "unary", "binary"

    Operators.construct = function(opr) {

        opr = opr.trim();
        switch(opr) {
            case ".":
                return new Operators.Concatenation();
            case "+":
                return new Operators.Addition();
            case "-":
                return new Operators.Subtraction();
            case "*":
                return new Operators.Multiplication();
            case "/":
                return new Operators.Division();
            case "%":
                return new Operators.Modulus();
            case "==":
                return new Operators.Equivalency();
            case "<>":
                return new Operators.Not();
            default:
                console.log("errors in osme operator constructor");
        }
        
        if (opr === ".") {
           
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
