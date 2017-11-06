var os = require('os');

var UT = UT || {};

(function(){
    UT.decode = function(content, language){
        var lines = content.split(os.EOL);
        var lessContent = "";
        var code = [];
        var j = 0;
        
        for(var i = 0; i< lines.length; i++){
    
            lineInfo = language.getLineInfo(lines[i]);
            if(lineInfo.isControl){
    
                lessContent = lines.slice(i).join(os.EOL);
                code[j] = language.controlStructureMatch(lineInfo.opening, lessContent, UT.decode);
                i += code[j].lines;
                
                j++;
    
            }
            else{
                code[j] = language.simpleMatch(lineInfo.simpleMatch, lines[i]);
                j++;
            }
    
    
        }
    
        return code;
    }
})();


module.exports = UT;
