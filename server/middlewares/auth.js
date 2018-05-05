const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    const { token } = req.headers
    jwt.verify(token, process.env.keyapi, (error, result) => {
      if (!error) {
        next()
      } else {
        return res.status(403).json({
          message: 'Invalid Token'
        })
      }
    })
  }
}