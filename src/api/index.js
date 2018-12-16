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
  }
};

export default AuthApi;