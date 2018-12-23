import { createStore } from 'redux';

const initialState = {
    token: '',
    refresh_token: '',
    isAuthenticated: false
};

const saveToken = (payload) => {
    localStorage.setItem('token', payload.token);
    localStorage.setItem('refresh_token', payload.refresh_token);
};

const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'AUTH_SUCCESS':
            saveToken(action.payload);
            return {
                ...state,
                token: action.payload.token,
                refresh_token: action.payload.refresh_token,
                isAuthenticated: true
            }
        case 'UNAUTH_USER':
            removeToken();
            return {
                ...state,
                token: '',
                refresh_token: '',
                isAuthenticated: false
            }
    }

    return state;
}

export default createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);