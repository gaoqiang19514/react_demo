import axios from 'axios';

import store from '../store';

const configureAxios = () => {

    // Add a request interceptor
    axios.interceptors.request.use(
        function(config) {

            // 如果token存在并且未过期 设置token
            const token = localStorage.getItem('token');
            if(token){
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