var view_index = require('./index');
var view_users = require('./users');

var api_users   = require('../controllers/users');


module.exports = function (app) {

    /**
     * view 路由
     */
    app.use('/users', view_users);

    /**
     * API 路由
     */
    // 用户
    app.get('/api/user/:user_id',api_users.UserInfo);
    // app.get('/api/user',api_users.UserList);

    // app.use('/api', require('./route_test'));
    //接口404页面  - 这个要放到最后面
    app.all('/api/*', function(req,res){
        res.status(404);
        res.send({
            "code":404,
            "message":"接口不存在！"
        });
    });
}
