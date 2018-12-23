
const initialState = {
    access_token: '',
    refresh_token: '',
    isAuthenticated: false
};

const saveToken = (payload) => {
    localStorage.setItem('access_token', payload.access_token);
    localStorage.setItem('refresh_token', payload.refresh_token);
};

const removeToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export default (state = initialState, action) => {
    switch(action.type){
        case 'AUTH_USER':
            saveToken(action.payload);
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                isAuthenticated: true
            }
        case 'UNAUTH_USER':
            // 清理localStorage中的access_token和refresh_token
            removeToken();
            return {
                ...state,
                access_token: '',
                refresh_token: '',
                isAuthenticated: false
            }
        default:
            return state;
    }
}