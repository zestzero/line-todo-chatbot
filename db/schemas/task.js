const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  owner_id: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const Task = mongoose.model('Task', taskSchema)
module.exports = Task
