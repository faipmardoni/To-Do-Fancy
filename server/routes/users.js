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
  detailUser,
  loginFB,
  loginManual
} = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', authentication, showUsers)
router.post('/', addUsers)
router.post('/login', loginFB)
router.post('/login-manual', loginManual)
router.get('/:id', authentication, detailUser)
router.delete('/:id', authentication, deleteUser)
router.put('/:id', authentication, updateUser)

module.exports = router
