import axios from 'axios';

import store from '../store';

export default () => {

    // Add a request interceptor
    axios.interceptors.request.use(
        function(config) {
            // loading = weui.loading('...');
            const access_token = localStorage.getItem('access_token');
            if(access_token){
                config.headers['authorization'] = `Bearer ${access_token}`;
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
            // loading.hide();
            // Do something with response data
            return response;
        },
        function(error) {
            // responses error before they are handled by then onRejected or catch
            // loading.hide();
            if(error.response){
                switch(parseInt(error.response.status, 10)){
                    case 400:
                        // bad request, directly show api return message (from server side)
                        break;
                    case 401:
                        store.dispatch({ type: 'UNAUTH_USER' });
                        break;
                    case 403:
                        store.dispatch({ type: 'UNAUTH_USER' });
                        break;
                    default:
                        // console.log(error.response);
                        // weui.tips('系統忙線中，請稍後再試');
                        break;
                }
            }else {
                // console.log(error.response);
                // weui.tips('系統忙線中，請稍後再試');
            }

            // Do something with response error
            return Promise.reject(error);
        }
    );

};