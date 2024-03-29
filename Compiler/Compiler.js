var nodejs = process.argv[1];
var file = process.argv[2];
var outFile = process.argv[3];
//var jsfile = file.slice(0, file.lastIndexOf('.')) + ".js";
var os = require('os');
//console.log(jsfile);


var Translator = require("./UniversalTranslator.js");
var Language = require("./OsmePlugin/osme-plugin.js");
var OutLanguage = require("./JSPlugin/js-write.js");


OutLanguage.addRecodeFxns(Language);
compile(file, outFile);//, "osme", "js")
//run(nodejs, jsFile)

function compile(file, outfile){

    var fs = require('fs');

    var content = fs.readFileSync(file, 'utf8');
    var code = Translator.decode(content, Language);
    //code = Translator.decode(content, Translator.Language);
    

    //console.log(code);

    var outCode = "";
    for (var i = 0; i < code.length; i++){
        if(typeof(code[i].recode) !== "undefined"){
            outCode += code[i].recode() + os.EOL;
        }
    }
    //console.log(outCode);

    fs.writeFileSync(outfile, outCode);
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








module.exports = compile;
