var JS = JS || {};

(function(){
    
    var os = require('os');
    var eol = new RegExp(os.EOL, "g");
    
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

            code += this.assignee + " = " + this.assigner;
            
            return code;
        };

        Language.Code.Write.prototype.recode = function(){
            
            var code = "";

            code += "console.log(" + this.statement + ")";
            
            return code;
        };

        Language.Code.DoLoop.prototype.recode = function(){
            
            var outCode = "";

            outCode += "for(";
            outCode += "var " + this.iterative + " = " + (this.sequence.start) + "; ";
            outCode += this.iterative + " < " + this.sequence.end + "; ";
            outCode += this.iterative + "++;){" + os.EOL;

            for(var i = 0; i < this.code.length; i++){
                if(typeof(this.code[i].recode) !== "undefined"){
                    outCode += this.code[i].recode() + os.EOL;
                }
            }
            outCode += "}" + os.EOL;
            
            return outCode;
        };

        Language.Code.IfStatement.prototype.recode = function(){
            
            var code = "";

            code += "TODO: If Statement";
            
            return code;
        };
    }
})();

module.exports = JS;