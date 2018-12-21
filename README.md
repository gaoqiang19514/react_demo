- [x] 加入redux react-redux
- [x] 为什么PrivateRoute组件只执行了一次？ 使用了connect的路由需要用withRouter包装一遍
- [ ] 加入路由过渡淡入淡出
- [ ] 以上对路由的淡出淡出可能会与rem冲突 需解决
- [ ] 添加history组件
- [ ] 为什么重复点击protected路由会导致退出？

# 初始化用户登录状态处理流程
    初始化读取localStorage中是否存在token
    有token 判断为已登录
    无token 判断为未登录

    这种方式只能判断token是否存在 无法判断token是否过期

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

# access token + refresh token 实现的登录认证
    利用续期的灵活性，把策略制定好，可以在用户静止较久以后的第一次更新Token时要求登录，这样就不会在操作中中断用户

    1 登录时得到access_token和refresh_token
    2 每次业务请求的时候带上access_token
    3 当业务请求得到access_token过期的响应时 发起refresh_token请求
    4 refresh_token请求校验通过 返回access_token
    5 再次发起之前的业务请求

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