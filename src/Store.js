import { createStore } from 'redux';

const initialState = {
    isAuthenticated: false
};

const reducer = (state = initialState, action) => {
    if(action.type === 'LOGIN'){
        return {
            ...state,
            isAuthenticated: true
        }
    }
    return state;
}

export default createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);