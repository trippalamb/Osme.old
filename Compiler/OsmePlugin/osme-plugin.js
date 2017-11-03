var Osme = Osme || {};
var Expander = require("./expander.js");
var Operators = require("./osme-operators.js");

(function(){

    var os = require('os');
    var eol = new RegExp(os.EOL, "g");

    Osme.Operators = 

    Osme.Code = {};
    
    Osme.Code.Comment_Single = function(m){

        this.whole = m[0];
        this.text = m[1];
        this.structure = "comment";

    }

    Osme.Code.Declaration = function(m){

        this.whole = m[0];
        this.structure = "declaration"
        this.type = m[1];
        this.name = m[2];

    }

    Osme.Code.Assignment = function(m){//, decode){
        
        this.whole = m[0];
        this.structure = "assignment";
        this.assignee = m[1];
        this.operator = " " + m[2].trim();
        this.assigner = m[3]; //todo: this should be a recursive decode check


    }

    Osme.Code.Expression = function(m){
        
        this.whole = m[0];
        this.structure = "expression";
        
        this.args = [];
        this.operator = "";


    }

    Osme.Code.Write = function(m){

        this.whole = [0];
        this.structure = "write";
        //this.statement = m[1];

        this.statement = Osme.expressionParse(m[1])
    }

    //TODO: probably rename this to a generic loop idea
    //maybe variable dependent loop or something
    Osme.Code.IterativeLoop = function(m, decode){
    
    
        this.lines = getLines(m[0], eol);
    
        this.structure     = "do";
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


        this.inner         = m[3];
        this.extra         = m[4];
    
        this.code          = decode(this.inner, Osme);
    }
    
    Osme.Code.IfStatement = function(m, decode){
    
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
    
    
    Osme.containerMatch = function(opening, content, decode){
    
        var reg;
        var code = {};
        if(opening === "do"){
            reg = /do\s+(\w)\s*(=\s*\d+\s*\.\.\.\s*\d+)([\s\S]*)end\s+do(.*)/mi;
            m = content.match(reg);
            code = new Osme.Code.IterativeLoop(m, decode);
        }
        else if(opening === "if"){
            reg = /if\s*\(([\s\S]*?)\)([\s\S]*?)(?:else\s*if\s*\(([\s\S]*?)\)([\s\S]*?))*(?:else([\s\S]*?))?end\s*if/mi;
            m = content.match(reg);
            code = new Osme.Code.IfStatement(m, decode);
        }
        else{
            console.log("error in multiline match");
        }
    
        return code;
    
    }

    Osme.atomicMatch = function(atomName, line){
    
        var reg;
        var code = {};
        if(atomName === "#"){
            //TODO: these lines should be moved into contructor
            reg = /#(.*)/;
            m = line.match(reg);
            code = new Osme.Code.Comment_Single(m);
        }
        else if(atomName === "::"){
            reg = /(\w+)\s*::\s*(\w+)/;
            m = line.match(reg);
            code = new Osme.Code.Declaration(m);
        }
        else if(atomName === "="){
            //TODO: make better code for these
            reg = /^\s*(\w+)\s*([\+|\-|*|/|]?=)(.*)/;
            m = line.match(reg);
            code = new Osme.Code.Assignment(m);
        }
        else if(atomName === "write"){
            reg = /write\s+(.*)/;
            m = line.match(reg);
            code = new Osme.Code.Write(m);
        }
        else{
            console.log("error in atomic match");
        }
    
        return code;
    
    }

    Osme.expressionParse = function(exp){
        //var operStr = ".+-*/%";

        var reg = /(.*)([\.\+\-\*\/]+)(.*)/;
        var m = exp.match(reg);
        console.log(m);

        if(m !== null){
            if(m[2].trim() == "."){
                return m[1] + " + " + m[3];
            }
        }
        return exp;

    }
    
    Osme.getLineInfo = function(line){
    
        var reg = /(do|if)/;
        var m = line.match(reg);
        var lineInfo = {};
    
        if(m !== null){
            lineInfo.isContainer = true;
            lineInfo.isAtomic = false;
            lineInfo.opening = m[1];
            lineInfo.atomicMatch = "";
        }
        else{
            lineInfo.isContainer = false;
            lineInfo.opening = "";
            reg = /(#|::|=|write)/
            m = line.match(reg);
            if(m !== null){
                lineInfo.isAtomic = true;
                lineInfo.atomicMatch = m[1];
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
