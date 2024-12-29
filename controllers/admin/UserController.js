const UserService = require('../../services/admin/UserService')
const JWT = require('../../utils/jwt')
const { handelPage } = require('../../utils/public')

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
  updataUser: async (req, res) => {
    try {
      const user = await UserService.getList({ _id: req.body.id })
      if (!user.length) {
        res.status(500).json({ message: '该用户不存在存在', status: 500 })
        return
      }
      const body = { ...req.body }
      const query = { _id: body.id }
      delete body.id
      const result = await UserService.updataUser(query, body)
      res.status(200).json({ status: 200, message: '更新成功' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  //添加用户信息
  addUser: async (req, res) => {
    try {
      const user = await UserService.getList({ userName: req.body.userName })
      if (!user.length) {
        const result = await UserService.addUser(req.body)
        res.status(200).json({ message: '添加成功', status: 200 })
      } else {
        res.status(500).json({ message: '该用户已存在', status: 500 })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  //查找用户列表-带查询条件
  getList: async (req, res) => {
    try {
      const pageParams = handelPage(req)
      const result = await UserService.getList({}, pageParams)
      const { list, total } = result
      res.status(200).json({ message: '成功', status: 200, data: list, total })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  //删除用户信息
  delUser: async (req, res) => {
    try {
      const result = await UserService.delUser(req.query.id)
      if (result.deletedCount) {
        res.status(200).json({ message: '删除成功', status: 200 })
      } else {
        res.status(500).json({ message: '删除失败', status: 500 })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
module.exports = UserController
