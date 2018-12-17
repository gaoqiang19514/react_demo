import APIUtil from './apiUtil';

const api = new APIUtil();

export default {
  getUser() {
    return api.get('protected');
  }
};
