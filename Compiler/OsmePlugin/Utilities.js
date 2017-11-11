var Utilities = Utilities || {};

(function () {

    Utilities.findMatchingBracket = function (searchStr, firstBracket, bracketType) {
        var count = 1;
        var i = firstBracket + 1;
        var matchingType;

        if (bracketType === '{') { matchingType = '}'; }
        else if (bracketType === '(') { matchingType = ')'; }
        else if (bracketType === '[') { matchingType = ']'; }

        while (count > 0) {
            if (searchStr[i] == bracketType) { count++; }
            else if (searchStr[i] == matchingType) { count--; }
            i++;
        }
        return (i - 1);
    }

})();

module.exports = Utilities;