var os = require('os');

var UT = UT || {};

(function(){
    UT.decode = function(content, language){
        var lines = content.split(/\r?\n/);
        var lessContent = "";
        var code = [];
        var j = 0;
        
        for(var i = 0; i< lines.length; i++){
    
            lineInfo = language.getLineInfo(lines[i]);
            if(lineInfo.isContainer){
    
                lessContent = lines.slice(i).join(os.EOL);
                code[j] = language.containerMatch(lineInfo.opening, lessContent, UT.decode);
                i += code[j].lines;
                
                j++;
    
            }
            else{
                code[j] = lines[i];
                j++;
            }
    
    
        }
    
        return code;
    }
})();


module.exports = UT;
