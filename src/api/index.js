import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.baseURL;

export default {
    get(path, data, config = {}) {
        return axios.get(path, {
            ...config,
            params: data
        });
    },
    post(path, data, config = {}) {
        return axios.post(path, data, config);
    },
    login(username, password) {
        const config = {
            auth: {
                username,
                password
            }
        };
        return this.post('login', {}, config);
    },
    refreshToken(refresh_token) {
        return this.get('refresh_token', {
            refresh_token: refresh_token
        });
    },
    getUser() {
        return this.get('protected');
    }
};