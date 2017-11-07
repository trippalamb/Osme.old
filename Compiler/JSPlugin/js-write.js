var JS = JS || {};

(function(){

    var os = require('os');
    var eol = new RegExp(os.EOL, "g");
    var tab = "  ";

    JS.addRecodeFxns = function(Language){

        Language.Code.Comment_Single.prototype.recode = function(){

            var code = "";

            code += "//" + this.text;

            return code;
        };

        Language.Code.Declaration.prototype.recode = function(indent){

            var indent = indent || "";
            var code = "";

            code += indent + "var " + this.var;

            if (typeof (this.expression) !== "undefined") {
                code += " = " + this.expression;
            }

            code += ";" + os.EOL;

            return code;
        };

        Language.Code.Assignment.prototype.recode = function(indent){

            var indent = indent || "";

            var code = "";

            code += indent + this.assignee + this.operator + this.assigner.recode() + ";" + os.EOL;

            return code;
        };

        Language.Code.Expression.prototype.recode = function (indent) {
            var indent = indent || "";

            if (this.structure === "atomic") {
                return this.whole;
            }
            else {
                var code = "";
                code += this.args[0].recode();
                code += this.operator.recode();
                code += this.args[1].recode();
                return code;
            }

        }

        Language.Code.Write.prototype.recode = function(indent){

            var indent = indent || "";

            var code = "";

            code += "console.log(" + this.statement.recode() + ");";

            return code;
        };

        Language.Code.IterativeLoop.prototype.recode = function(indent){

            var indent = indent || "";
            var innerIndent = indent + tab;

            var op = "";
            var chevron = "";

            if(this.sequence.start < this.sequence.end){
                chevron = " <= ";
                op = "+=";
            }
            else{
                chevron = " >= ";
                op = "-=";
            }

            var iter = this.iterative + op + this.sequence.by;

            var outCode = "";

            outCode += indent + "for(";
            outCode += "var " + this.iterative + " = " + (this.sequence.start) + "; ";
            outCode += this.iterative + chevron + this.sequence.end + "; ";
            outCode += iter + "){" + os.EOL;

            for(var i = 0; i < this.code.length; i++){
                if(typeof(this.code[i].recode) !== "undefined"){
                    outCode += this.code[i].recode(innerIndent);
                }
            }
            outCode += "}" + os.EOL;

            return outCode;
        };

        Language.Code.ConditionalLoop.prototype.recode = function (indent) {

            var code = "";
            var indent = indent || "";
            var innerIndent = indent + tab;

            code += indent + "while(";
            code += this.conditional + "){" + os.EOL;
            for (var i = 0; i < this.code.length; i++) {
                if (typeof (this.code[i].recode) !== "undefined") {
                    code += this.code[i].recode(innerIndent);
                }
            }
            code += "}" + os.EOL;

            return code;
            
        }

        Language.Code.IfStatement.prototype.recode = function(indent){

            var code = "";
            var indent = indent || "";
            var innerIndent = indent + tab;

            code += indent + "if(" + this.conditionals[0] + "){" + os.EOL;
            for(var i = 0; i < this.codes[0].length; i++){
                if(typeof(this.codes[0][i].recode) !== "undefined"){
                    code += this.codes[0][i].recode(innerIndent);
                    //console.log(JSON.stringify(this.codes[0][i]));
                }
            }
            code += os.EOL + indent + "}" + os.EOL;


            return code;
        };

        Language.Code.Fxn.prototype.recode = function(indent){

            var indent = indent || "";
            var innerIndent = indent + tab;
            var code = "";

            code += indent + "function(";
            for(var i = 0; i < this.args.length; i++){
                if(i === (this.args.length - 1)){
                    code += indent + this.args[i].name;
                }
                else{
                    code += indent + this.args[i].name + ", ";
                }
            }
            code += indent + "){" + os.EOL;
            for(var i = 0; i < this.inner.length; i++){
                if(typeof(this.inner[i].recode) !== "undefined"){
                    code += this.inner[i].recode(innerIndent);
                    //console.log(JSON.stringify(this.codes[0][i]));
                }
            }
            code += os.EOL + innerIndent + "return " + this.return.name + os.EOL;
            code += indent + "}" + os.EOL;

            return code;
        }


        //operator recodes

        Language.Operators.Concatenation.prototype.recode = function (indent) {
            return " + ";
        }

        Language.Operators.Addition.prototype.recode = function (indent) {
            return " + ";
        }

        Language.Operators.Subtraction.prototype.recode = function (indent) {
            return " - ";
        }

        Language.Operators.Multiplication.prototype.recode = function (indent) {
            return " * ";
        }

        Language.Operators.Division.prototype.recode = function (indent) {
            return " / ";
        }

        Language.Operators.Modulus.prototype.recode = function (indent) {
            return " % ";
        }

        Language.Operators.Equivalency.prototype.recode = function (indent) {
            return " == ";
        }

         Language.Operators.Not.prototype.recode = function (indent) {
            return " ! ";
        }
    }
})();

module.exports = JS;
