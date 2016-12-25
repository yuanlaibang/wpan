var conn = require('../schemas/mysql_database').connection;

module.exports = {
  /**
   * 通过用户ID获取用户信息
   */
  getUserInfoById:function(user_id,callback){
    conn.query(`select * from user_accounts where id=? limit 1`, [user_id],function(err,result){
      if(err){
        console.log(`error in getUserInfoById :`,err);
        return callback&&callback(err);
      }
      callback&&callback(err,result);
    });
  },
  /**
   * 通过用户邮箱获取用户信息
   */
  getUserInfoByEmail:function(email,callback){
    conn.query(`select * from user_accounts where email=? limit 1`, [email],function(err,result){
      if(err){
        console.log(`error in getUserInfoByEmail :`,err);
        return callback&&callback(err);
      }
      callback&&callback(err,result);
    });
  },
  /**
   * [addUsers 添加用户信息]
   * @param {[type]}   userdt   [用户信息数据]
   * @param {Function} callback [回调函数]
   */
  addUsers:function(query,callback){
    conn.query(`INSERT INTO user_accounts SET ${query.join(',')}`,function(err,result){
      if(err){
        console.log(`error in addUsers :`,err);
        return callback&&callback(err);
      }
      callback&&callback(err,result);
    });
  }
}