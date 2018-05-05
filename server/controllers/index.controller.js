const User = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  home: (req, res, next) => {
    res.render('index', { title: 'Express' })
  },
  signin: (req, res, next) => {
    const {
      email,
      password
    } = req.body
    User.findOne({ email })
      .exec()
      .then(user => {
        if (user) {
          const payload = {
            email
          }
          bcrypt.compare(password, user.password)
            .then((result) => {
              if (result) {
                const token = jwt.sign(payload, process.env.keyapi)
                res.status(200).json({
                  message: 'success',
                  token
                })
              } else {
                return res.status(401).json({
                  message: 'username & password doesn\'t match'
                })
              }
            })
        } else {
          return res.status(400).json({
            message: "Username not found"
          })
        }
      })
      .catch(error => {
        console.log('error :', error);
      })
  },
}