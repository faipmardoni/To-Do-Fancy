const express = require('express')
const router = express.Router()
const {
  home,
  signin
} = require('../controllers/index.controller')

/* GET home page. */
router.get('/', home)
router.post('/', signin)

module.exports = router
