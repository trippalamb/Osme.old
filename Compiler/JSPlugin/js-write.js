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

        Language.Code.Declaration.prototype.recode = function(){
            
            var code = "";

            code += "var " + this.name + ";";
            
            return code;
        };

        Language.Code.Assignment.prototype.recode = function(){
            
            var code = "";

            code += this.assignee + this.operator + this.assigner;
            
            return code;
        };

        Language.Code.Write.prototype.recode = function(){
            
            var code = "";

            code += "console.log(" + this.statement + ")";
            
            return code;
        };

        Language.Code.IterativeLoop.prototype.recode = function(indent){
            
            var indent = indent || "";
            var innerIndent = indent + tab;

            var op = "";
            var chevron = "";

            if(this.sequence.start < this.sequence.end){
                chevron = " < ";
                op = "+=";
            }
            else{
                chevron = " > ";
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

        Language.Code.IfStatement.prototype.recode = function(indent){
            
            var code = "";
            var indent = indent || "";
            var innerIndent = indent + tab;

            code += indent + "if(" + this.conditionals[0] + "){" + os.EOL;
            for(var i = 0; i < this.codes[0].length; i++){
                if(typeof(this.codes[0][i].recode) !== "undefined"){
                    code += this.codes[0][i].recode(innerIndent);
                    console.log(JSON.stringify(this.codes[0][i]));
                }
            }
            code += os.EOL + indent + "}" + os.EOL;
            
            
            return code;
        };
    }
})();

module.exports = JS;
