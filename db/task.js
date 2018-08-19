const TaskSchema = require('./schemas/task')

exports.createTask = async ({ ownerId, content }) => {
  return TaskSchema.create({ owner_id: ownerId, content })
}

exports.updateTask = async ({ taskId, content, order }) => {
  return TaskSchema.findOneAndUpdate({ _id: taskId }, { $set: { content, order } }, { new: true })
}

exports.deleteTask = async ({ taskId }) => {
  return TaskSchema.findOneAndUpdate({ _id: taskId }, { $set: { deleted: true } }, { new: true })
}

exports.completeTask = async ({ taskId }) => {
  return TaskSchema.findOneAndUpdate({ _id: taskId }, { $set: { completed: true } }, { new: true })
}

exports.findTaskById = async ({ taskId }) => {
  return TaskSchema.findById(taskId).lean()
}

exports.findTasksByOwnerId = async ({ ownerId }) => {
  return TaskSchema.find({
    owner_id: ownerId,
    deleted: false,
    completed: false
  }).sort({ created_date: 1 }).lean()
}
