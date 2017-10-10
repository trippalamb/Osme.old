//var input = "{x|y} % {2|3|5} == {0|1}";
//console.log(expander(input));

//todo: this is most assurredly not correct for every instance
//todo: this has some unneccesarily copy and pasted code
var Expander = Expander || {};
var expanderRegex = /\((.*){(.*)}(.*)\)/g;
Expander.expand = function(rawCode){

    var editedCode = rawCode.replace(expanderRegex, expanderReplace);
    var lastEditedCode = rawCode;
    var substrs = [];

    while(editedCode.trim() != lastEditedCode.trim()){
        lastEditedCode = editedCode;
        substrs = editedCode.split('||');
        editedCode = substrs[0].replace(expanderRegex, expanderReplace);
        for(var i = 1; i <substrs.length; i++){
            editedCode += "||" + substrs[i].replace(expanderRegex, expanderReplace);
        }

        substrs = editedCode.split('&&');
        editedCode = substrs[0].replace(expanderRegex, expanderReplace);
        for(var i = 1; i <substrs.length; i++){
            editedCode += "&&" + substrs[i].replace(expanderRegex, expanderReplace);
        }
    }

    function expanderReplace(str, p1, p2, p3){

        var output = "";
        var substrs = p2.split('|');

        if(substrs.length !== 1){
            output += "(" + p1 + substrs[0] + p3 + ")";
            for(var i = 1; i < substrs.length; i++){
                output += " || (" + p1 + substrs[i] + p3 + ")";
            }
            return "(" + output + ")";
        }

        var substrs = p2.split('&');
        if(substrs.length !== 1){
            output += "(" + p1 + substrs[0] + p3 + ")";
            for(var i = 1; i < substrs.length; i++){
                output += " && (" + p1 + substrs[i] + p3 + ")";
            }
            return "(" + output + ")";
        }

        return str;
    }

    return editedCode;
}

module.exports = Expander;
