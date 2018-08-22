const TaskSchema = require('./schemas/task')

exports.createTask = async ({ ownerId, content, dateTime }) => {
  const order = await TaskSchema.count({ owner_id: ownerId }).lean()
  return TaskSchema.create({ owner_id: ownerId, content, date_time: dateTime, order })
}

exports.updateTask = async ({ taskId }, updated) => {
  return TaskSchema.findOneAndUpdate({ _id: taskId }, { $set: { ...updated } }, { new: true })
}

exports.importantTask = async ({ taskId, important = false }) => {
  return TaskSchema.findOneAndUpdate({ _id: taskId }, { $set: { important } }, { new: true })
}

exports.deleteTask = async ({ taskId }) => {
  return TaskSchema.findOneAndUpdate({ _id: taskId }, { $set: { deleted: true } }, { new: true })
}

exports.completeTask = async ({ taskId, completed = false }) => {
  return TaskSchema.findOneAndUpdate({ _id: taskId }, { $set: { completed } }, { new: true })
}

exports.findTaskById = async ({ taskId }) => {
  return TaskSchema.findById(taskId).lean()
}

exports.findTasksByOwnerId = async ({ ownerId }) => {
  return TaskSchema.find({
    owner_id: ownerId,
    deleted: false
  }).sort({ created_date: 1 }).lean()
}
