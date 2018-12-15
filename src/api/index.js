import axios from 'axios';

const login = (username, pswd) => {
    return axios.get('/login')
}

export default {
    login
}