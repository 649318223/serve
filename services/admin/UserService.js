const UserModel = require('../../models/UserModel')
const UserService = {
  login: async ({ userName, userPwd }) => {
    try {
      return UserModel.find({
        userName,
        userPwd
      })
    } catch (error) {}
  },
  getUserInfo: async id => {
    try {
      return UserModel.findById(id).exec()
    } catch (error) {}
  },
  updataUser: async (query, body) => {
    try {
      return UserModel.updateOne(query, body)
    } catch (error) {}
  },
  //查找用户列表-带查询条件
  getList: async (data, pageParams) => {
    if (pageParams) {
      const total = await UserModel.find(data).countDocuments()
      const list = await UserModel.find(data).skip(pageParams.skip).limit(pageParams.limit)
      return { total, list }
    } else {
      return UserModel.find(data)
    }
  },
  //添加用户信息
  addUser: async data => {
    return UserModel.create(data)
  },
  //删除用户信息
  delUser: async _id => {
    return UserModel.deleteOne({ _id })
  }
}
module.exports = UserService
