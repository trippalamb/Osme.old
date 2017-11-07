var Osme = Osme || {};
var Expander = require("./expander.js");
var Operators = require("./osme-operators.js");

(function(){

    var os = require('os');
    var eol = new RegExp(os.EOL, "g");

    Osme.Operators = require("./osme-operators.js");

    Osme.Code = {};
    Osme.Variables = [];
    Osme.Types = [];

    Osme.Code.Variable = function(type, name){
        this.type = type;
        this.name = name;
    }

    Osme.Code.Comment_Single = function(content){

        var reg = /#(.*)/;
        var m = content.match(reg);
        this.whole = m[0];
        this.text = m[1];
        this.structure = "comment";

    }

    Osme.Code.Declaration = function(content){

        var reg = /(\w+)\s*::\s*(\w+)(?:\s*=\s*(.*))/;
        var m = content.match(reg);
        this.whole = m[0];
        this.structure = "declaration"
        this.var = new Osme.Code.Variable(m[1], m[2]);
        if (typeof (m[3]) !== "undefined") {
            this.expression = new Osme.Code.Expression(m[3]);
        }
        
        Osme.Variables.push(this.var);

    }

    Osme.Code.Assignment = function(content){//, decode){

        //TODO: make better code for these
        var reg = /^\s*(\w+)\s*([\+|\-|*|/|]?=)(.*)/;
        var m = content.match(reg);
        this.whole = m[0];
        this.structure = "assignment";
        this.assignee = m[1];
        this.operator = " " + m[2].trim();
        this.assigner = new Osme.Code.Expression(m[3]);


    }

    Osme.Code.Expression = function(content){

        var reg = /(.*)([\.\+\-\*\/]+)(.*)/;
        var m = content.match(reg);

        //if (m !== null) {
        //    if (m[2].trim() == ".") {
        //        return m[1] + " + " + m[3];
        //    }
        //}
        //return exp;

        if (m !== null) {
            this.whole = m[0];
            this.structure = "expression";

            this.args = [];
            this.args[0] = new Osme.Code.Expression(m[1]);
            this.args[1] = new Osme.Code.Expression(m[3]);
            this.operator = Osme.Operators.construct(m[2]);

        }
        else {
            this.structure = "atomic";
            this.whole = content;
        }


    }

    Osme.Code.Write = function(content){

        var reg = /write\s+(.*)/;
        var m = content.match(reg);
        this.whole = [0];
        this.structure = "write";
        //this.statement = m[1];
        this.statement = new Osme.Code.Expression(m[1]);
    }

    Osme.Code.IterativeLoop = function(content, decode){

        var reg = /do\s+(\w)\s*(=\s*\d+\s*\.\.\.\s*\d+)([\s\S]*)end\s+do(.*)/mi;
        var m = content.match(reg);
        this.lines = getLines(m[0], eol);

        this.structure     = "iterativeLoop";
        this.whole         = m[0];
        this.iterative     = m[1];


        this.sequence = {};
        this.sequence.m = m[2];
        var mi = m[2].match(/(?:=\s*(\w+)\s*)?...\s*(\w+)(?:\s*by\s*(\w+))?/);
        this.sequence.start = parseInt(mi[1]);
        this.sequence.end   = parseInt(mi[2]);
        if(typeof(mi[3]) !== "undefined"){
            this.sequence.by = parseInt(mi[3]);
        }
        else{
            this.sequence.by = 1;
        }

        this.inner = m[3];
        this.extra = m[4];

        this.code = decode(this.inner, Osme);

    }

    Osme.Code.ConditionalLoop = function(content, decode){
        var reg = /do\s + (?:while|until) \s *\((.*)\)([\s\S] *)end\s +do/mi;
        var m = content.match(reg);
        this.lines = getLines(m[0], eol);

        this.structure = "conditionalLoop";
        this.whole = m[0];
        this.conditional = Expander.expand(m[1]);
        this.code = decode(this.inner, Osme);
    }

    Osme.Code.IfStatement = function(content, decode){

        var reg = /if\s*\(([\s\S]*?)\)([\s\S]*?)(?:else\s*if\s*\(([\s\S]*?)\)([\s\S]*?))*(?:else([\s\S]*?))?end\s*if/mi;
        var m = content.match(reg);

        for(var i = 0; i < m.length; i++){
            if(typeof(m[i]) === "undefined"){
                m.splice(i, 1);
                i--;
            }
        }
        this.structure = "if";

        this.lines = getLines(m[0], eol);


        this.whole = m.shift();

        this.conditionals  = [];
        this.inners = [];

        if(m.length % 2 === 1){
            this.defaultInner = m.pop();
        }

        while (m.length > 0){

            this.conditionals.push(Expander.expand(m.shift()));
            this.inners.push(m.shift());

        }

        this.codes = [];
        for(var i = 0; i < this.inners.length; i++){
            this.codes[i] = decode(this.inners[i], Osme);
        }

        if(typeof(this.defaultInner) !== "undefined"){
            this.defaultCode = decode(this.defaultInner, Osme);
        }

    }

    Osme.Code.Fxn = function(content, decode) {
        var reg = /fxn\s+(.+?)\(([\s\S]*?)\)\s*return\((.+?)\)([\s\S]*)end\s*fxn\s+\1/mi;
        var m = content.match(reg);
        this.whole = m[0];
        this.name = m[1];
        this.args = parseArguments(m[2]);
        this.return = parseReturn(m[3]);
        this.inner = decode(m[4], Osme);
        console.log(JSON.stringify(this.args));

        function parseArguments(argList){
            var args = argList.split(',');
            var vars = [];
            for(var i = 0; i < args.length; i++){
                var pieces = args[i].split(" ");
                vars.push(new Osme.Code.Variable(pieces[0], pieces[1]));
            }
            //console.log(JSON.stringify(vars));
            return vars;
        }

        function parseReturn(r){
            var pieces = r.split(" ");
            return new Osme.Code.Variable(pieces[0], pieces[1]);
        }
    }


    Osme.controlStructureMatch = function(opening, content, decode){

        var reg;
        var code = {};
        if(opening === "do"){
            code = new Osme.Code.IterativeLoop(content, decode);
        }
        else if(opening === "if"){
            code = new Osme.Code.IfStatement(content, decode);
        }
        else if (opening === "fxn") {
            code = new Osme.Code.Fxn(content, decode);
        }
        else{
            console.log("error in control structure match");
        }

        return code;

    }

    Osme.simpleMatch = function(simpleName, line){

        var reg;
        var code = {};
        if(simpleName === "#"){
            code = new Osme.Code.Comment_Single(line);
        }
        else if(simpleName === "::"){
            code = new Osme.Code.Declaration(line);
        }
        else if(simpleName === "="){
            code = new Osme.Code.Assignment(line);
        }
        else if(simpleName === "write"){
            code = new Osme.Code.Write(line);
        }
        else if(typeof(simpleName) === "undefined"){
            //do nothing
        }
        else{
            console.log("error in atomic match");
        }

        return code;

    }

    Osme.getLineInfo = function(line){

        var reg = /(do|if|fxn)/;
        var m = line.match(reg);
        var lineInfo = {};

        if(m !== null){
            lineInfo.isControl = true;
            lineInfo.isAtomic = false;
            lineInfo.opening = m[1];
            lineInfo.simpleMatch = "";
        }
        else{
            lineInfo.isControl = false;
            lineInfo.opening = "";
            reg = /(#|::|=|write)/
            m = line.match(reg);
            if(m !== null){
                lineInfo.isAtomic = true;
                lineInfo.simpleMatch = m[1];
            }
        }

        return lineInfo;
    }


    function getLines(m, eol){
        var eolMatch = m.match(eol);
        var lines = 0;


        if(typeof(eolMatch) !== "undefined"){
            lines = eolMatch.length; //this is really - 1 (for 0 match) and + 1(for end of last matched line)
        }
        else{
            lines = 0;
        }

        return lines;
    }
})();

module.exports = Osme;
