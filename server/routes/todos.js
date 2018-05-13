const express = require('express')
const router = express.Router()
const {
  authentication
} = require('../middlewares/auth')
const {
  showTodos,
  addTodos,
  deleteTodos,
  updateTodos,
  detailTodos
} = require('../controllers/todo.controller')

/* GET todos listing. */
router.get('/', showTodos)
router.post('/', authentication, addTodos)
router.get('/:id', authentication, detailTodos)
router.delete('/:id', deleteTodos)
router.put('/:id', updateTodos)

module.exports = router;
