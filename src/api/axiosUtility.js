import axios from 'axios';

import store from '../Store';

const configureAxios = () => {

    // Add a request interceptor
    axios.interceptors.request.use(
        function(config) {
            const token = localStorage.getItem('token');
            if(token){
                config.headers['authorization'] = `Bearer ${token}`;
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
            if(error.response){
                switch(parseInt(error.response.status, 10)){
                    case 400:
                        break;
                    case 401:
                        store.dispatch({ type: 'UNAUTH_USER' });
                        break;
                    case 403:
                        store.dispatch({ type: 'UNAUTH_USER' });
                        break;
                    default:
                        break;
                }
            }

            // Do something with response error
            return Promise.reject(error);
        }
    );

};

export default configureAxios;