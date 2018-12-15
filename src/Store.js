import { createStore } from 'redux';

const AUTH_KEY = 'authenticated';

const isAuthenticated = !!localStorage.getItem(AUTH_KEY);

const initialState = {
    loading: false,
    isAuthenticated: isAuthenticated
};

const reducer = (state = initialState, action) => {
    if(action.type === 'LOGIN'){
        localStorage.setItem(AUTH_KEY, action.token);
        return {
            ...state,
            isAuthenticated: true
        }
    }

    if(action.type === 'LOGOUT'){
        localStorage.removeItem(AUTH_KEY);
        return {
            ...state,
            isAuthenticated: false
        }
    }

    if(action.type === 'SHOW_LOADING'){
        return {
            ...state,
            loading: true
        }
    }

    if(action.type === 'HIDE_LOADING'){
        return {
            ...state,
            loading: false
        }
    }

    return state;
}

export default createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);