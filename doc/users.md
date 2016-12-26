
# 目录

- [用户登录](#用户登录)  
- [用户注册](#用户注册)  
- [退出登录](#退出登录)  
- [验证是否登录](#验证是否登录)  
- [获取用户信息](#获取用户信息)  

## 用户登录

> `POST` `/api/signin`  
> `<email>` 用户邮箱  
> `<password>` 用户密码  

**raw params**

```json 
{
  "email":"wowohoo@qq.com",
  "password":"123456"
}
```

**Callback**

```json
{
    "code": 0,
    "token": "",
    "message": {
        "id": 1,
        "nickname": "同一种调调",
        "email": "wowohoo@qq.com",
        "password_reset": 0,
        "sex": 0,
        "status": 0,
        "avatar_url": "",
        "zipcode": "200001",
        "region": "地址: xxx街2000号",
        "city": "上海市",
        "province": "上海市",
        "country": "中国",
        "create_at": "2016-12-06T08:26:33.675Z",
        "update_at": "2016-12-06T08:26:33.675Z"
    }
}
```

## 用户注册

> `POST` `/api/user/`  

**raw params**

```json
{
    "nickname": "同一种调调",
    "email": "wowohoo@qq.com",
    "password": "123456",
    "sex": 0,
    "status": 0,
    "avatar_url": "",
    "zipcode": "200001",
    "region": "地址: xxx街2000号",
    "city": "上海市",
    "province": "上海市",
    "country": "中国"
}
```

**Callback**

```json
{
    "code": 0,
    "message": "添加成功！"
}
```


## 验证是否登录

> `POST` `/api/verify/:token`  

**Callback**

```json
{
    "code": 0,
    "message": "已登录！"
}
```


## 退出登录

> `PUT` `/api/logout`  

**Callback**

```json
{
    "code": 0,
    "message": "注销成功！"
}
```

## 获取用户信息

> `GET` `/api/user/:user_id`  
> `<:user_id>` 用户id  

**Callback**

```json
{
    "code": 0,
    "message": "获取成功！",
    "data": {
        "id": 1
    }
}
```
