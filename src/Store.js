import { createStore } from 'redux';

const initialState = {
    loading: false,
    token: '',
    refresh_token: '',
    isAuthenticated: false
};

const saveToken = props => {
    localStorage.setItem('token', props.token);
    localStorage.setItem('refresh_token', props.refresh_token);
};

const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
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
        saveToken(action.payload);
        return {
            ...state,
            token: action.payload.token,
            refresh_token: action.payload.refresh_token,
            isAuthenticated: true
        }
    }

    if(action.type === 'UNAUTH_USER'){
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