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
        res.status(200).json({ message: '登录成功' })
      } else {
        res.status(500).json({ message: '用户名或密码错误' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (token) {
        const payload = JWT.verifyToken(token)
        if (payload) {
          const result = await UserService.getUserInfo(payload.id)
          res.status(200).json(result)
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
module.exports = UserController
