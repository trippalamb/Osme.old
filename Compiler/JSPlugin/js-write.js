var JS = JS || {};

(function(){
    
    var os = require('os');
    var eol = new RegExp(os.EOL, "g");
    
    JS.addDecodeFxns = function(Language){

        Language.Code.Comment_Single.prototype.decode = function(){
            
            var code = "";

            code += "//" + this.text;
            
            return code;
        };

        Language.Code.Declaration.prototype.decode = function(){
            
            var code = "";

            code += "var " + this.name + ";";
            
            return code;
        };

        Language.Code.Assignment.prototype.decode = function(){
            
            var code = "";

            code += this.asignee + " = " + this.assigner;
            
            return code;
        };

        Language.Code.Write.prototype.decode = function(){
            
            var code = "";

            code += "console.log(" + this.statement + ")";
            
            return code;
        };

        Language.Code.DoLoop.prototype.decode = function(){
            
            var code = "";

            code += "TODO: Do Loop";
            
            return code;
        };

        Language.Code.IfStatement.prototype.decode = function(){
            
            var code = "";

            code += "TODO: If Statement";
            
            return code;
        };
    }
})();

module.exports = JS;