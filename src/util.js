
const makeCancelable = (promise) => {
    let active = true;
    return {
        cancel() {
            active = false
        },
        promise: promise.then(
            value => active ? value : new Promise(() => {}),
            reason => active ? reason : new Promise(() => {})
        )
    }
}

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

export default {
    makeCancelable,
    accessTokenIsValid,
    refreshTokenIsValid,
    creteNumSeriesString
};