import { get, post } from './apiUtil';

const AuthApi = {
    login(username, password) {
        const config = {
            auth: {
                username,
                password
            }
        };
        return post('login', {}, config);
    },
    refreshToken() {
        return get('refresh_token')
    },
    getUser() {
        return get('protected');
    }
};

export default AuthApi;