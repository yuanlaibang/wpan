var jwt = require('jsonwebtoken'); // 这是一个生成Token
var users = require('../models/users')

/**
 * [Signin 登录]
 */
exports.Signin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    if(req.session.token){
        return res.json({
            code:0,
            token:req.session.token,
            message:"登录成功！",
            data:req.session.users
        })
    }

    users.getUserInfoByEmail(email,function(err,result){
        if(err) return res.json({
            code:err.errno,
            message:err.code
        })
        if(!result||result.length === 0) return res.json({
            code:110,
            message:"该用户没有注册！"
        })
        var usersdt = result[0];

        if(usersdt.password !== password) return res.json({
            code:110,
            message:"用户名或密码错误"
        })
        var token = jwt.sign(usersdt.id+new Date().getTime(), 'wpan19870403');
        req.session.token = token;
        req.session.users = usersdt;
        delete usersdt.password;
        res.json({
            code:0,
            token:token,
            message:"登录成功！",
            data:usersdt
        })
    })
}
/**
 * [Signin 注册]
 */
exports.Signup = function(req, res){
    var userdt = req.body;
    var keys = ["nickname", "email", "password", "sex", "status", "avatar_url", "zipcode", "region", "city", "province", "country"];
    var query = []
    for(var a in userdt){
        if(keys.indexOf(a)>-1){
            query.push(`${a}="${userdt[a]}"`)
        }
    }
    if(query.length<1){
        return res.json({
            code:1101,
            message:"请传入正确的参数！"
        })
    }

    if(userdt.email){
        users.getUserInfoByEmail(userdt.email,function(err,result){
            if(err) return res.json({
                code:err.errno,
                message:err.code
            })
            if(result&&result.length>0){
                return res.json({
                    code:1101,
                    message:"邮箱已存在！"
                }) 
            }
            users.addUsers(query,function(err,result){
                if(err) return res.json({
                    code:err.errno,
                    message:err.code
                })
                res.json({
                    code:0,
                    message:"添加成功！"
                })
            });

        })
    }else{
        res.json({
            code:1101,
            message:"请填写邮箱地址！"
        }) 
    }

}

/**
 * [Logout 注销]
 */
exports.Logout = function(req, res){

    if(req.session.token){
        req.session.token = ""
        req.session.users = ""
    }

    res.json({
        code:0,
        message:"注销成功！"
    })
      
}

/**
 * [VerifyToken 验证登录信息]
 */
exports.VerifyToken = function(req, res){
    var token = req.params.token;
    var message = '';
    if(!req.session.token) message = "没有登录请登录！";
    if(!token) message = "请传参数！";
    if(token!==req.session.token) message = "token不存在！";
    if(message){
       return res.json({
            code:12001,
            message:message
        }) 
    }

    if(token==req.session.token){
       return res.json({
            code:0,
            message:'已登录！'
        }) 
    }else{
       return res.json({
            code:12003,
            message:'没有登录请登录！'
        }) 
    } 
}