- [x] 加入redux react-redux
- [x] 为什么PrivateRoute组件只执行了一次？
        使用了connect的路由需要用withRouter包装一遍
- [ ] 加入路由过渡淡入淡出
- [ ] 以上对路由的淡出淡出可能会与rem冲突 需解决

# 初始化用户登录状态处理流程
    初始化读取localStorage中是否存在token
    有token 判断为已登录
    无token 判断为未登录

    这种方式只能判断token是否存在 无法判断token是否过期

# 处理token过期的情况
    初始需要发一个请求到后台校验token是否过期
    需要阻塞其他操作，等到请求响应后再做其他事情
