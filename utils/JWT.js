const jsonwebtoken = require('jsonwebtoken')

const secret = 'my_token'

const JWT = {
  generateToken(payload) {
    return jsonwebtoken.sign(payload, secret, { expiresIn: '1d' })
  },
  verifyToken(token) {
    try {
      return jsonwebtoken.verify(token, secret)
    } catch (error) {
      return false
    }
  },
  //获取token解密信息
  getToken(req) {
    if (!req.headers.authorization) {
      return {}
    }
    const token = req.headers.authorization.split(' ')[1]
    const payload = JWT.verifyToken(token)
    if (payload) {
      return payload
    }
    return {}
  }
}

module.exports = JWT
