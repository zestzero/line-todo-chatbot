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
  important: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  date_time: {
    type: Date
  },
  create_date: {
    type: Date,
    default: new Date()
  },
  updated_date: {
    type: Date,
    default: new Date()
  }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task
