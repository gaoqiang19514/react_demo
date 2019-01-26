const refreshTokenIsValid = (refreshToken) => {
    return true;
}

const accessTokenIsValid = (accessToken) => {
    return true;
}

const creteNumSeriesString = (start, end) => {
    const result = []
    for(let i = start; i <= end; i++){
        result.push(String(i))
    }
    return result
}

const randomRangeNum = (min, max) => {
    var range = max - min;
    var rand = Math.random();
    return min + Math.round(range * rand);
}

const closest = function (el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    const old = el
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el !== old;
}

export default {
    accessTokenIsValid,
    refreshTokenIsValid,
    creteNumSeriesString,
    randomRangeNum,
    closest
};