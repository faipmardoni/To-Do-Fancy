const mongoose = require('mongoose')
const schema = mongoose.Schema

const todoSchema = new schema({
  taskName: { type: String, require: true, default: 'No Title' },
  status: { type: Boolean, default: false },
  priority: { type: String, default: 'none' },
  reminder: { type: Date },
  note: { type: String },
  userId: {
    type: schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
    timestamps: true
  })

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo