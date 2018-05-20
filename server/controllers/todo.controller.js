const Todo = require('../models/todo.models')
const User = require('../models/user.models')
const axios = require('axios')

var HolidayAPI = require('node-holidayapi');
var hapi = new HolidayAPI('8b2755d4-e7b3-4526-834d-defbfb88c8dc').v1;

var parameters = {
  // Required
  country: 'US',
  year:    2018,
  // Optional
  // month:    7,
  // day:      4,
  // previous: true,
  // upcoming: true,
  // public:   true,
  // pretty:   true,
};

hapi.holidays(parameters, function (err, data) {
  // Insert awesome code here...
  console.log('data :', data);
});

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
    axios.get('http://archive.org/advancedsearch.php?q=publicdate%3A%5B2018-05-13%5D+mediatype%3Amovies&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=1&page=1&output=json&callback=callback')
    .then((result) => {
      console.log('result :', result.data);
    }).catch((err) => {
      console.log('err :', err);
    });
    const userId = req.headers.result.id
    Todo.create({ taskName, priority, userId, reminder, note })
      .then(todo => {
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