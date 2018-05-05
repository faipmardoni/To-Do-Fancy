const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const {
  isEmail
} = require('validator')

const userSchema = new schema({
  name: { type: String, require: true },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email address is required'],
    unique: true,
    validate: [isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    require: [true, 'password address is required'],
    match: [/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/, 'Password should contain 8 character and atleast one capital letter, one number and one special character']
  },
  todos: [{
    type: schema.Types.ObjectId, ref: 'Todo',
  }]
},
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// userSchema.post('save', function (error, doc, next) {
//   console.log('this :', this);
//   if (user.isModified('email') && error.name === 'BulkWriteError' && error.code === 11000) {
//     next(error.message = 'Email already exists')
//   } else {
//     next(error, this)
//   }
// })


const User = mongoose.model('user', userSchema)

module.exports = User