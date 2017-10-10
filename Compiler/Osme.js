var nodejs = process.argv[0];
//var file = process.argv[1];
var file = "C:/Users/tripp.lamb/Projects/Osme/ProjectEulerExamples/Osme/Problem1.osme";
var jsfile = file.slice(0, file.lastIndexOf('.')) + ".js";

compile(file, jsfile)//, "osme", "js")
//run(nodejs, jsFile)

function compile(file, outfile){

    var Expander = require('./expander.js');
    
    var fs = require('fs');

    

    var program  = [];
    var j = 0;

    content = fs.readFileSync(file, 'utf8');
    lines = content.split("\r\n");
    var lessContent = "";
    
    for(var i = 0; i< lines.length; i++){

        lineInfo = getLineInfo(lines[i]);
        if(lineInfo.multiline){
            lessContent = lines.slice(i).join("\r\n");
            program[j] = multilineMatch(lineInfo.opening, lessContent);
            i += program[j].lines;
            
            j++;

        }
        else{
            program[j] = lines[i];
            j++;
        }


    }

    console.log(program);

    //fs.writeFileSync(outfile, content);
    //console.log("Conversion Complete");

}

function getLineInfo(line){

    var reg = /(do|if)/;
    var m = line.match(reg);
    var lineInfo = {};

    if(m !== null){
        lineInfo.multiline = true;
        lineInfo.opening = m[1];
    }
    else{
        lineInfo.multiline = false;
    }

    return lineInfo;
}

function multilineMatch(opening, content){

    var reg;
    var code = {};
    if(opening === "do"){
        reg = /do\s+(\w)\s*(=\s*\d+\s*\.\.\.\s*\d+)([\s\S]*)end\s+do(.*)/mi;
        m = content.match(reg);
        code = {
            structure: "do",
            whole:         m[0],
            iterative:     m[1],
            iterativeVals: m[2],
            inner:         m[3],
            extra:         m[4],
            lines:         5
        }
    }
    return code;

}

function run(nodejs, jsfile){
    var exec = require('child_process').exec;
    var cmd = nodejs + " " + jsfile;

    exec(cmd, function(error, stdout, stderr){
        if(error  !== null){console.log(error );}
        if(stdout !== null){console.log(stdout);}
        if(stderr !== null){console.log(stderr);}
    });

}

module.exports = compile;
