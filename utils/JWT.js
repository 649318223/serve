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
  }
}

module.exports = JWT
