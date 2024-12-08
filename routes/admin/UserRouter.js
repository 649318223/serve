var express = require('express')
var UserRoter = express.Router()
var UserController = require('../../controllers/admin/UserController')

/* 登录 */
UserRoter.post('/admin/user/login', UserController.login)

UserRoter.get('/admin/user/getUserInfo', UserController.getUserInfo)

UserRoter.get('/admin/user/token', function (req, res, next) {
  res.status(200).json({ message: '11' })
})
module.exports = UserRoter
