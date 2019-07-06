module.exports = function check(str, bracketsConfig) {
    const config = {};
    bracketsConfig.forEach((bracketsPair) => {
        config[bracketsPair[1]] = bracketsPair[0];
    });

    console.log(config);

    const openBrackets = [];
    for (let i = 0; i < str.length; i++) {
        const bracket = str.charAt(i);

        if (isOpeningBracket(bracket) || isBadBracket(bracket)) {
            openBrackets.push(bracket);
        } else {
            let lastOpenBracket = openBrackets.pop();

            if (lastOpenBracket === undefined) return false;

            let badBracketsSequence = '';
            while (isBadBracket(lastOpenBracket)) {
                badBracketsSequence = lastOpenBracket + badBracketsSequence;

                lastOpenBracket = openBrackets.pop();
            }

            if (lastOpenBracket !== config[bracket]) {
                return false;
            }

            if (!isValidBadBracketsSequence(badBracketsSequence)) {
                return false;
            }
        }
    }

    function isOpeningBracket(bracket) {
        return !(bracket in config) && !isBadBracket(bracket);
    }

    function isClosingBracket(bracket) {
        return bracket in config && !isBadBracket(bracket);
    }

    function isBadBracket(bracket) {
        return bracket === config[bracket];
    }

    if (openBrackets.length !== 0) {
        const remainedSequence = openBrackets.join('');

        for (let i = 0; i < remainedSequence.length; i++) {

            const bracket = remainedSequence.charAt(i);
            if (!isBadBracket(bracket)) {
                return false;
            }
        }

        return isValidBadBracketsSequence(remainedSequence);
    }

    return openBrackets.length === 0;
};

function isValidBadBracketsSequence(badBracketsSequence) {
    const openBrackets = [];
    for (let i = 0; i < badBracketsSequence.length; i++) {
        const bracket = badBracketsSequence.charAt(i);

        if (!openBrackets.includes(bracket)) {
            openBrackets.push(bracket);
        } else {
            let lastOpenBracket = openBrackets.pop();

            if (lastOpenBracket !== bracket) {
                return false;
            }
        }
    }
    
    return openBrackets.length === 0;
}
