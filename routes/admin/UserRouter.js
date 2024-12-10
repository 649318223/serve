var express = require('express')
var UserRoter = express.Router()
var UserController = require('../../controllers/admin/UserController')
const multer = require('multer')
const upload = multer({ dest: 'public/user' })

/* 登录 */
UserRoter.post('/admin/user/login', UserController.login)

UserRoter.get('/admin/user/getUserInfo', UserController.getUserInfo)

UserRoter.post('/admin/user/update', upload.single('file'), UserController.update)

UserRoter.get('/admin/user/token', function (req, res, next) {
  res.status(200).json({ message: '11' })
})
module.exports = UserRoter
