const JWT = require('./JWT')
const checkToken = (req, res, next) => {
  const whiteList = ['/admin/user/login'] // 白名单
  if (whiteList.includes(req.url)) {
    return next()
  }

  const tokenInfo = JWT.getToken(req)
  if (!tokenInfo.userName) {
    return res.status(401).json({
      code: 401,
      message: '未登录'
    })
  }

  next()
}
module.exports = checkToken
