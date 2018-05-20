const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    const { auth } = req.headers
    jwt.verify(auth, process.env.MY_SECRET, (error, result) => {
      if (!error) {
        req.headers.result = result
        next()
      } else {
        return res.status(403).json({
          message: 'Invalid Token'
        })
      }
    })
  },
  authorization(req, res, next) {
    const { auth } = req.headers
    const decoded = jwt.decode(auth)
    if (decoded.role == 'admin') {
      return next()
    } else {
      return res.status(403).json({
        message: 'You dont have access'
      })
    }
  }
}