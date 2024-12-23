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
  update: async ({ id, userName, desc, userAvatar }) => {
    try {
      return UserModel.updateOne(
        { _id: id },
        {
          userName,
          desc,
          userAvatar
        }
      )
    } catch (error) {}
  },
  //查找用户列表-带查询条件
  getList: data => {
    return UserModel.find(data, ['userName', 'userPhone', 'desc'])
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
