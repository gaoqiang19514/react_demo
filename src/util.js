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

export default {
    makeCancelable,
    accessTokenIsValid,
    refreshTokenIsValid
};