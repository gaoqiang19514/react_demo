// import Util from '../util';
// const Mock = require('mockjs');
// const Random = Mock.Random;

// Mock.setup({
//     timeout: 2000
// });

// // 登录
// Mock.mock(/login/, 'get', function(options){
//     return {
//         status: 'success',
//         token: '7cf97d1c-048d-408d-a694-a3f95454cecf'
//     }
// });

// // 刷新access token
// Mock.mock(/refreshToken/, 'get', function(options){
//     // 1 从请求中取得refresh_token
//     // 2 检查refresh_token是否过期
//     // 3 过期 直接返回401 没有过期 返回新的access_token

//     if(Util.refreshTokenIsValid(options.refreshToken)){
//         return {
//             status: 200,
//             token: '7cf97d1c-048d-408d-a694-a3f95454cecf',
//             message: 'refresh token is valid'
//         }
//     }

//     return {
//         status: 401,
//         message: 'refresh token is expired'
//     }
// });

// // 返回用户列表
// Mock.mock(/getProtectedData/, 'get', function(options){
//     // 1 从请求中取得access_token
//     // 2 检查access_token是否过期
//     // 3 过期 直接返回401 没有过期 返回protectedData

//     if(Util.accessTokenIsValid(options.accessToken)){
//         const data = [
//             { id: Random.id(), name: Random.name(), email: Random.email() },
//             { id: Random.id(), name: Random.name(), email: Random.email() },
//             { id: Random.id(), name: Random.name(), email: Random.email() },
//             { id: Random.id(), name: Random.name(), email: Random.email() },
//             { id: Random.id(), name: Random.name(), email: Random.email() }
//         ];

//         return {
//             status: 200,
//             data: data
//         }
//     }

//     return {
//         status: 401,
//         message: 'access token is expired'
//     }    
// });