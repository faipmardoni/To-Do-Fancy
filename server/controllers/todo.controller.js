const Todo = require('../models/todo.models')
const User = require('../models/user.models')

module.exports = {
  showTodos(req, res, next) {
    Todo.find()
      .populate('userId')
      .exec()
      .then(todos => {
        res.status(200).json({
          message: 'Successfully',
          todos
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'failed',
          error
        })
      })
  },
  addTodos(req, res, next) {
    const {
      taskName,
      priority,
      note,
      reminder
    } = req.body
    console.log('req.body :', req.body);
    const userId = req.headers.result.id
    Todo.create({ taskName, priority, userId, reminder, note })
      .then(todo => {
        console.log('todo :', todo);
        User.findByIdAndUpdate(todo.userId,
          {
            $push: {
              todos: todo._id
            }
          }
        )
          .exec()
          .then(user => {
            res.status(200).json({
              message: 'successfully',
              todo
            })
          })
      })
      .catch(error => {
        res.status(400).json({
          message: 'failed',
          reason: error
        })
      })
  },
  detailTodos(req, res, next) {
    Todo.findById(req.params.id)
      .exec()
      .then(todo => {
        res.status(200).json({
          message: 'success',
          todo
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'failed',
          reason: error
        })
      })
  },
  deleteTodos(req, res, next) {
    Todo.findByIdAndRemove(req.params.id)
      .exec()
      .then(todo => {
        User.findByIdAndUpdate(todo.userId, {
          $pull: {
            todos: todo._id
          }
        })
          .exec()
          .then(user => {
            res.status(200).json({
              message: 'successfully',
              todo
            })
          })
      })
      .catch(error => {

      })
  },
  updateTodos(req, res, next) {
    console.log('req.body :', req.body);
    Todo.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
      .exec()
      .then(todo => {
        res.status(200).json({
          message: 'success update',
          todo
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'failed update',
          reason: error
        })
      })
  }
}