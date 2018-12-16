import { createStore } from 'redux';

const initialState = {
    loading: false,
    token: '',
    isAuthenticated: false
};

const reducer = (state = initialState, action) => {
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

    if(action.type === 'AUTH_SUCCESS'){
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            token: action.payload.token,
            isAuthenticated: true
        }
    }

    if(action.type === 'UNAUTH_USER'){
        localStorage.removeItem('token');
        return {
            ...state,
            isAuthenticated: false
        }
    }


    return state;
}

export default createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);