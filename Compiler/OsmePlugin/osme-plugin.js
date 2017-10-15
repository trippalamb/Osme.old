var Osme = Osme || {};

(function(){
    var os = require('os');
    var eol = new RegExp(os.EOL, "g");
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

    Osme.Code.Assignment = function(m){
        this.whole = m[0];
        this.structure = "assignment";
        this.assignee = m[1];

        if(m[2] === "="){
            this.assigner = m[3]; //todo: this should be a recursive decode check
        }
        else{
            this.assigner = [this.assignee, m[2].substr(1,1), m[3]].join(" ");
        }
    }

    Osme.Code.Write = function(m){

        this.whole = [0];
        this.structure = "write";
        this.statement = m[1];
    }

    Osme.Code.DoLoop = function(m, decode){
    
    
        this.lines = getLines(m[0], eol);
    
        this.structure     = "do";
        this.whole         = m[0];
        this.iterative     = m[1];
        this.iterativeVals = m[2];
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
        
            this.conditionals.push(m.shift());
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
            code = new Osme.Code.DoLoop(m, decode);
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
