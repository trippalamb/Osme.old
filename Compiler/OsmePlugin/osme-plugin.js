var Osme = Osme || {};

(function(){
    Osme.Code = {};
    
    Osme.Code.DoLoop = function(m, decode){
    
    
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
    
    Osme.getLineInfo = function(line){
    
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
})();

module.exports = Osme;
