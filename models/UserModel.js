const mongoose = require('mongoose')
const Schema = mongoose.Schema

// user模型===》users集合

const UserType = {
  userName: String,
  userPwd: String,
  userPhone: String,
  userSex: String,
  userAge: Number,
  userAddress: String,
  userAvatar: String,
  userStatus: Number,
  userCreateTime: Date,
  userUpdateTime: Date,
  desc: String
}
const UserModel = mongoose.model('user', new Schema(UserType))
module.exports = UserModel
