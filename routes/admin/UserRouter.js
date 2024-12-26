var express = require('express')
var UserRoter = express.Router()
var UserController = require('../../controllers/admin/UserController')
const multer = require('multer')
const upload = multer({ dest: 'public/user' })

/* 登录 */
UserRoter.post('/admin/user/login', UserController.login)
// 获取用户信息
UserRoter.get('/admin/user/getUserInfo', UserController.getUserInfo)
// 更新用户信息
UserRoter.post('/admin/user/updataUser', upload.single('file'), UserController.updataUser)
//添加用户信息
UserRoter.post('/admin/user/addUser', UserController.addUser)
//获取用户列表
UserRoter.post('/admin/user/getList', UserController.getList)
// 删除用户列表
UserRoter.get('/admin/user/delUser', UserController.delUser)

UserRoter.get('/admin/user/token', function (req, res, next) {
  res.status(200).json({ message: '11' })
})
module.exports = UserRoter
