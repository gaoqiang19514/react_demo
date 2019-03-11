import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import axiosSetting from './api/axiosSetting';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Store';

// 后面这里要根据环境判断下
import './mock';

// import 'amfe-flexible'

// 配置axios
axiosSetting();



const access_token  = localStorage.getItem('access_token');
const refresh_token = localStorage.getItem('refresh_token');

if (access_token && refresh_token) {
    store.dispatch({ 
        type: 'AUTH_USER', payload: {
            access_token: access_token,
            refresh_token: refresh_token
        } 
    });
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
