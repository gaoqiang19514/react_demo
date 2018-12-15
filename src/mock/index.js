const Mock = require('mockjs');

Mock.setup({
    timeout: 2000
});

Mock.mock(/login/, 'get', function(options){
    return {
        status: 'success',
        token: '7cf97d1c-048d-408d-a694-a3f95454cecf'
    }
});