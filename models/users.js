var conn = require('../schemas/mysql_database').connection;

module.exports = {
  /**
   * 获取用户信息
   */
  getUserInfo:function(user_id,callback){
    conn.query(`select * from user_accounts where id = ?`, [user_id],function(err,result){
      if(err){
        console.log(`error in UserInfo :`,err);
        return callback&&callback(err);
      }
      callback&&callback(err,result);
    });
  }
}