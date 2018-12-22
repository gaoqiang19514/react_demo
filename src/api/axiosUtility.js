import axios from 'axios';

import * as session from '../services/session';
import store from '../Store';
import api from './index';

let refreshSubscribers = [];
const subScribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
}

const onRrefreshed = (token) => {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
}

let isRefreshing = false;

// Add a request interceptor
const configureAxios = () => {
    axios.interceptors.request.use(
        function(config) {

            // 如果token存在并且未过期 设置token
            if(session.isAuthenticated()){
                const token = session.getToken();
                config.headers = {
                    authorization: `Bearer ${token}`
                };
            }
            
            return config;
        },
        function(error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        function(response) {
            // Do something with response data
            return response;
        },
        function(error) {
            if (parseInt(error.response.status, 10) === 401 || parseInt(error.response.status, 10) === 403) {
                store.dispatch({
                    type: 'UNAUTH_USER'
                });
            }
            // Do something with response error
            return Promise.reject(error);
        }
    );

};

export default configureAxios;