var User = require('../models/users');

/**
 * [userinfo 获取用户信息]
 */
exports.UserInfo = function(req, res){
    var uid = req.params.user_id;

    if(!uid){
        return res.json({
            code:110,
            message:"请传用户ID！"
        })
    }

    User.getUserInfoById(uid,function(err,results){
        if(err){
            return res.json({
                code:err.errno,
                message:err.code
            })
        }
        if(results!=null&&results&&results.length>0){
            delete results[0].password;
            res.json({
                code:0,
                data:results[0]
            })
        }else if(results.length===0){
            res.json({
                code:110,
                message:"用户不存在"
            })
        }else{
            res.json({
                code:120,
                message:err
            })
        }
    })
}