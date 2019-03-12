import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.baseURL;

export default {
  get(path, data = {}, config = {}) {
    return axios.get(path, {
      ...config,
      // validateStatus: function (status) {
      //     return status < 500; // 状态码在大于或等于500时才会 reject
      // },
      params: data
    });
  },
  post(path, data = {}, config = {}) {
    return axios.post(path, data, config);
  },
  login(username, password) {
    const config = {
      auth: {
        username,
        password
      }
    };
    return this.post('login', {}, config);
  },
  refreshToken(refresh_token) {
    return this.get('refresh_token', {
      refresh_token: refresh_token
    });
  },
  getUser() {
    return this.get('protected');
  },
  // 获取指定状态的订单列表
  getOrderList(status, page) {
    return this.get('getOrderList', { status: status, page: page })
  },
  hotProducts() {
    return this.get('hotProducts')
  },
  // 获取指定商城的分类列表
  getProductCateList(type) {
    // 1 京东  2 严选  3 自营
    return this.get('getProductCateList', { type: type })
  },
  // 根据分类获取产品列表
  getProductByCate(type, cate) {
    return this.get('getProductByCate', { type: type, cate: cate })
  },
  getProductById(id) {
    return this.get('getProductById', { id })
  },
  // 热卖商品
  getHotsell() {
    return this.get('hotsell')
  },
  getRechargePhoneProductsByType(type) {
    return this.get('getRechargePhoneProductsByType', {type})
  },
  confirmPaymentPswd(paymentPswd) {
    return this.post('confirmPaymentPswd', {paymentPswd})
  },
  // 话费充值
  rechargePhone(id, phone) {
    return this.get('rechargePhone', {id, phone})
  }
};