import jwtDecode from 'jwt-decode';

import store from '../Store';
import * as storage from './storage';

export const getToken = () => {
    let token;

    token = store.getState().token;

    if(token){
        return token;
    }

    token = storage.getItem('token');
    if(token){
        return token;
    }

    return false;
}

export const isTokenValid = (token) => {
    if(!token){
        return false;
    }

    try{
        const decoded = jwtDecode(token);
        if(typeof decoded.exp === 'undefined'){
            return false;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        console.log(`exp:${date.valueOf()} now:${new Date().valueOf()} dif:${(date.valueOf() - new Date().valueOf()) / 1000}s`);
        return date.valueOf() > new Date().valueOf();
    }catch(error){
        return false;
    }
}

export const isAuthenticated = () => {
    const token = getToken();
    return isTokenValid(token);
}