import axios from 'axios';
import APIUtil from './apiUtil';

const api = new APIUtil();

const AuthApi = {
  login(username, password) {
    const config = {
      auth: {
        username,
        password
      }
    };

    return api.post('login', {}, config);
  },
  refreshToken() {
    return api.get('refresh_token')
  },
    getUser() {
    return api.get('protected');
  }
};

export default AuthApi;