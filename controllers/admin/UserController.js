const UserService = require('../../services/admin/UserService')
const JWT = require('../../utils/jwt')

const UserController = {
  //get all users
  login: async (req, res) => {
    try {
      const result = await UserService.login(req.body)
      if (result.length > 0) {
        // 生成token
        const token = JWT.generateToken({
          id: result[0].id,
          userName: result[0].userName
        })
        res.header('Authorization', token)
        res.status(200).json({ message: '登录成功', status: 200 })
      } else {
        res.status(500).json({ message: '用户名或密码错误', status: 500 })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const { id } = JWT.getToken(req)
      if (id) {
        const result = await UserService.getUserInfo(id)
        res.status(200).json({ message: '成功', status: 200, data: result })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  // 更新用户信息
  update: async (req, res) => {
    try {
      const { id } = JWT.getToken(req)
      if (id) {
        const { userName, desc, userAvatar } = req.body
        const result = await UserService.update({
          id,
          userName,
          desc,
          userAvatar: `/user/${req.file.filename}`
        })
        res.status(200).json({ status: 200, message: '更新成功' })
      } else {
        res.status(500).json({ message: '用户不存在' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  //添加用户信息
  addUser: async (req, res) => {
    try {
      const user = await UserService.findUsernInfo({ userName: req.body.userName })
      if (!user.length) {
        const result = await UserService.addUser(req.body)
        res.status(200).json({ message: '添加成功', status: 200 })
      } else {
        res.status(500).json({ message: '该用户已存在', status: 500 })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
module.exports = UserController
