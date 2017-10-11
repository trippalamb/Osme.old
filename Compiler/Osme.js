var nodejs = process.argv[1];
var file = process.argv[2];
//var file = "C:/Users/tripp.lamb/Projects/Osme/ProjectEulerExamples/Osme/Problem1.osme";
var jsfile = file.slice(0, file.lastIndexOf('.')) + ".js";
var os = require('os');

compile(file, jsfile)//, "osme", "js")
//run(nodejs, jsFile)

function compile(file, outfile){

    var Expander = require('./expander.js');
    var fs = require('fs');

    

    content = fs.readFileSync(file, 'utf8');
    code = decode(content);
    

    console.log(code);

    //fs.writeFileSync(outfile, content);
    //console.log("Conversion Complete");

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

//TODO: make a translator file
function decode(content){
    var lines = content.split(/\r?\n/);
    var lessContent = "";
    var code = [];
    var j = 0;
    
    for(var i = 0; i< lines.length; i++){

        lineInfo = getLineInfo(lines[i]);
        if(lineInfo.isContainer){

            lessContent = lines.slice(i).join(os.EOL);
            code[j] = containerMatch(lineInfo.opening, lessContent);
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


//todo: make part of the Osme plugin
function getLineInfo(line){

    var reg = /(do|if)/;
    var m = line.match(reg);
    var lineInfo = {};

    if(m !== null){
        lineInfo.isContainer = true;
        lineInfo.opening = m[1];
    }
    else{
        lineInfo.isContainer = false;
    }

    return lineInfo;
}

//todo: make part of the Osme plugin
function containerMatch(opening, content){

    var reg;
    var code = {};
    if(opening === "do"){
        reg = /do\s+(\w)\s*(=\s*\d+\s*\.\.\.\s*\d+)([\s\S]*)end\s+do(.*)/mi;
        m = content.match(reg);
        code = new Code_DoLoop(m);
    }
    else if(opening === "if"){
        reg = /if\s*\(([\s\S]*?)\)([\s\S]*?)(?:else\s*if\s*\(([\s\S]*?)\)([\s\S]*?))*(?:else([\s\S]*?))?end\s*if/mi;
        m = content.match(reg);
        code = new Code_IfStatement(m);
    }
    else{
        console.log("error in multiline match");
    }

    return code;

}




//todo: make part of the Osme plugin
function Code_DoLoop(m, content){


    var eolMatch = m[0].match(/\r?\n/g);

    if(eolMatch !== null){
        this.lines = eolMatch.length; //this is really - 1 (for 0 match) and + 1(for end of last matched line)
    }
    else{
        this.lines = 0; //this is really - 1 (for 0 match) and + 1(for end of last matched line)
    }

    this.structure     = "do";
    this.whole         = m[0];
    this.iterative     = m[1];
    this.iterativeVals = m[2];
    this.inner         = m[3];
    this.extra         = m[4];

    this.code          = decode(this.inner);
}
//todo: make part of the Osme plugin
function Code_IfStatement(m, content){

    for(var i = 0; i < m.length; i++){
        if(typeof(m[i]) === "undefined"){
            m.splice(i, 1);
            i--;
        }
    }
    this.structure = "if";

    var eolMatch = m[0].match(/\r?\n/g);

    if(eolMatch !== null){
        this.lines = eolMatch.length; //this is really - 1 (for 0 match) and + 1(for end of last matched line)
    }
    else{
        this.lines = 0; //this is really - 1 (for 0 match) and + 1(for end of last matched line)
    }

    this.whole = m.shift();

    this.conditionals  = [];
    this.inners = [];

    if(m.length % 2 === 1){
        this.defaultInner = m.pop();
    }

    while (m.length > 0){
    
        this.conditionals.push(m.shift());
        this.inners.push(m.shift());

    }
    
    this.codes = [];
    for(var i = 0; i < this.inners.length; i++){
        this.codes[i] = decode(this.inners[i]);
    }

    if(typeof(this.defaultInner) !== "undefined"){
        this.defaultCode = decode(this.defaultInner);
    }

}

module.exports = compile;
