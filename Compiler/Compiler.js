var nodejs = process.argv[1];
var file = process.argv[2];
var jsfile = file.slice(0, file.lastIndexOf('.')) + ".js";
var os = require('os');

var Translator = require("./UniversalTranslator.js");
var Language = require("./OsmePlugin/osme-plugin.js");
var OutLanguage = require("./JSPlugin/js-write.js");
var Expander = require("./OsmePlugin/expander.js");

OutLanguage.addDecodeFxns(Language);
compile(file, jsfile)//, "osme", "js")
//run(nodejs, jsFile)

function compile(file, outfile){

    var fs = require('fs');

    var content = fs.readFileSync(file, 'utf8');
    content = Expander.expand(content);
    var code = Translator.decode(content, Language);
    //code = Translator.decode(content, Translator.Language);
    

    console.log(code);

    var outCode = "";
    for (var i = 0; i < code.length; i++){
        if(typeof(code[i].decode) !== "undefined"){
            outCode += code[i].decode() + os.EOL;
        }
    }
    console.log(outCode);

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








module.exports = compile;
