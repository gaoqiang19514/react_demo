- [x] 加入redux react-redux
- [x] 为什么PrivateRoute组件只执行了一次？
        使用了connect的路由需要用withRouter包装一遍
- [ ] 加入路由过渡淡入淡出
- [ ] 以上对路由的淡出淡出可能会与rem冲突 需解决
- [ ] 添加history组件

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
