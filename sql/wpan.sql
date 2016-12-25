-- NOT NULL 不能为空
-- unsigned 是指数值类型只能为正数。
-- DEFAULT 默认值

CREATE DATABASE IF NOT EXISTS wpan CHARACTER SET utf8mb4;
USE wpan;
SET FOREIGN_KEY_CHECKS=0;

-- -----------------------------------------------------------------------------
-- Table `users_accounts`
-- 用户数据表
-- -----------------------------------------------------------------------------

DROP TABLE IF EXISTS `users_accounts`;

CREATE TABLE `user_accounts` (
  `id`             int(100) unsigned NOT NULL AUTO_INCREMENT,
  `nickname`       varchar(255) DEFAULT '' COMMENT '昵称',
  `email`          varchar(255) NOT NULL COMMENT '邮箱地址',
  `password`       varchar(255) NOT NULL COMMENT '密码',
  `password_reset` varchar(255) NOT NULL DEFAULT 1 COMMENT '是否需要重置密码：0－不需要；1-需要',
  `sex`            tinyint(1)   DEFAULT 0 COMMENT '性别 0:保密  1:男  2：女',
  `status`         tinyint(1)   DEFAULT 0 COMMENT '账号状态, 0:未设置，1:被禁用',
  `avatar_url`     varchar(255) DEFAULT '' COMMENT '头像URL',
  `zipcode`        varchar(32)  DEFAULT '' COMMENT '邮编地址',
  `region`         varchar(255) DEFAULT '' COMMENT '地址: xxx街2000号',
  `city`           varchar(100) DEFAULT '' COMMENT '区',
  `province`       varchar(100) DEFAULT '' COMMENT '省',
  `country`        varchar(100) DEFAULT '' COMMENT '国家',
  `create_at`      timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at`      timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COMMENT='用户表信息';