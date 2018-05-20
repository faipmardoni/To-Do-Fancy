const User = require('../models/user.models')
const Todo = require('../models/todo.models')
const FB = require('fb')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const env = require('dotenv')

module.exports = {
  showUsers(req, res, next) {
    User.find(
      (error, users) => {
        if (!error) {
          res.status(200).json({
            message: 'query success',
            users
          })
        } else {
          res.status(400).json({
            message: 'failed',
            reason: error
          })
        }
      }
    )
  },
  addUsers(req, res, next) {
    User.create(req.body)
      .then(user => {

        let payload = {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }

        const token = jwt.sign(payload, process.env.MY_SECRET)

        res.status(200).json({
          message: 'success added user',
          user,
          token
        })
      })
      .catch(error => {
        res.status(401).json({
          message: 'failed',
          reason: error
        })
      })
  },
  detailUser(req, res, next) {
    User.findById(req.params.id)
      .populate('todos')
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'query success',
          user
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'failed',
          reason: error
        })
      })
  },
  deleteUser(req, res, next) {
    User.findByIdAndRemove(req.params.id)
      .exec()
      .then(user => {
        Todo.deleteMany({ userId: user._id })
          .exec()
          .then(todo => {
            res.status(200).json({
              message: 'success delete',
              user
            })
          })
      })
      .catch(error => {
        res.status(400).json({
          message: 'failed delete',
          reason: error
        })
      })
  },
  updateUser(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: 'query' })
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'success update',
          user
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'failed update',
          reason: error
        })
      })
  },
  loginFB(req, res, next) {
    const access_token = req.body.access_token
    FB.api('me', { fields: ['id', 'name', 'email', 'picture.width(800).height(800)'], access_token }, function (response) {
      const { name, id, email, picture } = response
      User.findOne({ email })
        .then(user => {
          if (user) {
            let payload = {
              id: user.id,
              name: user.name,
              email: user.email,
            }
            const token = jwt.sign(payload, process.env.MY_SECRET)
            res.status(200).json({
              message: 'success',
              user,
              token,
            })
          } else {
            User.create({
              name,
              email,
              password: `Todo#${id}`,
              photo: picture.data.url
            })
          }
        })
        .catch(error => {
          res.status(400).json({
            message: 'error',
            error
          })
        })
    });
  },
  loginManual(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        bcrypt.compare(password, user.password).then((response) => {
          if (!response) {
            res.status(401).json({
              message: 'email & password doesn\'t match'
            })
          } else {
            let payload = {
              id: user.id,
              name: user.name,
              email: user.email,
            }
            const token = jwt.sign(payload, process.env.MY_SECRET)
            res.status(200).json({
              message: 'success',
              user,
              token,
            })
          }
        });
      })
      .catch(error => {
        res.status(404).json({
          message: 'email not found please register',
          error
        })
      })
  }
}