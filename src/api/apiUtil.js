import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.baseURL;

export const get = (path, config = {}) => {
    return axios.get(path, config);
}


export const post = (path, data, config = {}) => {
    return axios.post(path, data, config);
}