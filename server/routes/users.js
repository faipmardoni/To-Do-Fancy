const express = require('express')
const router = express.Router()
const {
  authentication
} = require('../middlewares/auth')
const {
  showUsers,
  addUsers,
  deleteUser,
  updateUser,
  detailUser
} = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', authentication, showUsers)
router.post('/', authentication, addUsers)
router.get('/:id', authentication, detailUser)
router.delete('/:id', authentication, deleteUser)
router.put('/:id', authentication, updateUser)

module.exports = router
