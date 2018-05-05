const User = require('../models/user.models')
const Todo = require('../models/todo.models')

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
        res.status(200).json({
          message: 'success added user',
          user
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'failed to add users',
          reason: error
        })
      })
  },
  detailUser(req, res, next) {
    User.findById(req.params.id)
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
    new User(req.body)
      .save()
      .then(function (user) {
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
    // User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    //   .exec()
    //   .then(user => {
    //     res.status(200).json({
    //       message: 'success update',
    //       user
    //     })
    //   })
    //   .catch(error => {
    //     res.status(400).json({
    //       message: 'failed update',
    //       reason: error
    //     })
    //   })
  }
}