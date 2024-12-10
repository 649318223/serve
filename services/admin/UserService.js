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
  update: async ({ id, userName, userPwd, userAvatar }) => {
    try {
      return UserModel.updateOne(
        { _id: id },
        {
          userName,
          userPwd,
          userAvatar
        }
      )
    } catch (error) {}
  }
}
module.exports = UserService
