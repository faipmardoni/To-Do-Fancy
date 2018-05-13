const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const {
  isEmail
} = require('validator')
const uniqueValidator = require('mongoose-unique-validator')

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
  role: {
    type: String,
    default: 'User'
  },
  photo: {
    type: 'String',
    default: 'http://teejr.com/wp-content/uploads/2015/06/no-photo-availiable.jpg'
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

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })

const User = mongoose.model('User', userSchema)

module.exports = User