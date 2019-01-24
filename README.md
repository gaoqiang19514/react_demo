- [x] 加入redux react-redux
- [x] 为什么PrivateRoute组件只执行了一次？ 使用了connect的路由需要用withRouter包装一遍
- [x] 加入路由过渡淡入淡出
- [x] 添加history组件
- [x] 为什么重复点击protected路由会导致退出？
- [x] 离开组件时如果有异步请求或者定时器没清理掉会报错
- [x] 登录请示直接500的问题 (原来是登录请求被带上了token)
- [x] 将get和post封装一下 使get也能像post一样传参 省去拼接参数的麻烦
- [x] 扔掉除最后一次请求的响应
- [x] 登录加上Loading效果
- [x] 话费充值
- [x] 电子卡券
- [x] 双色球
- [x] 积分提取
- [x] 添加银行
- [x] 商品分类页
- [ ] 严选购买流程
- [ ] 弹层组件
- [ ] shouldComponentUpdate的应用
- [ ] 将双色球弹层改成当前组件的路由弹层 https://reacttraining.com/react-router/web/example/modal-gallery
- [ ] 引入rem
- [ ] 以上对路由的淡出淡出可能会与rem冲突 需解决
- [ ] 给订单页不同状态作为一个swiper使其能够左右滑动



# 处理token过期的情况
    方式一
    初始需要发一个请求到后台校验token是否过期
    需要阻塞其他操作，等到请求响应后再做其他事情
    方式二
    初始化判断登录标志 如果为true 则直接渲染传入组件
    如果为false 则判断应用中token是否有效（存在和过期都要判断）
    token有效 更新登录标志为true
    token无效 更新登录表示为false以及token清理工作

# 刷新token的流程

    //  判断token是否满足刷新条件
    function checkIfNeedRefreshToken() {
        return true;
    }

    //  刷新token
    function getRefreshToken() { 
        return api.get('refreshToken')
    }

    //  将所有的请求都push到数组中
    let refreshSubscribers = [];
    function subscribeTokenRefresh(cb) {
        refreshSubscribers.push(cb);
    }


# token过期校验思路
    1. 后台每次接收到请求时校验过期
    2. 前台每次请求时拦截校验是否过期


# 登录请求
``
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));

        dispatch({ type: AUTH_USER });

        browserHistory.push('/reduxauth/users');
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
``

//  登录成功
localStorage.setItem('user', JSON.stringify(response.data));
dispatch({ type: AUTH_USER });
browserHistory.push('/reduxauth/users');

更新redux的登录标志
case AUTH_USER:
    return { ...state, authenticated: true, error: {} };

//  登录失败
dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right"))
case SIGNIN_FAILURE:
    return { ...state, error: { signin: action.payload } };


# 下面两个action是用来做什么的
    case AUTH_USER:
      return { ...state, authenticated: true, error: {} };
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: {} };


    登出操作 更新redux中的登录标志
      /**
        * Sign out
        */
       export function signoutUser() {
         localStorage.clear();

         return {
           type: UNAUTH_USER,
         }
       }


# NotAuthentication 和 Authentication的区别在哪里？
        改组件的作用是将已登录的用户重定向到指定路由 也就是不用已登录用户访问 比如等页面 已登录的用户不应该让其再次进来
        NotAuthentication
        如果是登录用户 去users
        if (this.props.authenticated) {
            browserHistory.push('/reduxauth/users');
        }

        Authentication
        如果未登录 去注册
        if (!this.props.authenticated) {
            browserHistory.push('/reduxauth/signup');
        }
