const _ = require('lodash')
const TaskModel = require('../models/task')
const { ERROR_MSG } = require('../utils/constants')
const { getCompactTask } = require('../utils/task')
const { getFormatDateTime } = require('../utils/date')

const validateExistTask = async (taskId, callback) => {
  try {
    const task = await TaskModel.findTaskById({ taskId })
    if (_.isEmpty(task)) return { error: ERROR_MSG.TASK.NOT_FOUND }

    return { result: await callback(task) }
  } catch (err) {
    return { error: err.message }
  }
}

const getOnlyValidUpdate = ({ content, order, date, time }) => {
  let update = {}
  if (content) update.content = content
  if (order) update.order = order
  if (date && time) update.date_time = getFormatDateTime(date, time)
  return update
}

exports.createTask = async ({ ownerId, content, date, time }) => {
  const dateTime = getFormatDateTime(date, time)
  const task = await TaskModel.createTask({ ownerId, content, dateTime })
  return getCompactTask(task)
}

exports.getTasks = async ({ ownerId }) => {
  const tasks = await TaskModel.findTasksByOwnerId({ ownerId })
  return _.map(tasks, getCompactTask)
}

exports.getTaskById = async ({ taskId }) => {
  const task = await TaskModel.findTaskById({ taskId })
  return getCompactTask(task)
}

exports.updateTask = async ({ taskId, content, order, date, time }) => {
  const update = getOnlyValidUpdate({ content, order, date, time })
  const { result, error } = await validateExistTask(taskId, async () => {
    return TaskModel.updateTask({ taskId }, { ...update })
  })
  if (error) return { error }
  return getCompactTask(result)
}

exports.deleteTask = async ({ taskId }) => {
  const { result, error } = await validateExistTask(taskId, async () => {
    return TaskModel.deleteTask({ taskId })
  })
  if (error) return { error }
  return getCompactTask(result)
}

exports.importantTask = async ({ taskId }) => {
  const { result, error } = await validateExistTask(taskId, ({ important }) => {
    return TaskModel.importantTask({ taskId, important: !important })
  })
  if (error) return { error }
  return getCompactTask(result)
}

exports.completeTask = async ({ taskId }) => {
  const { result, error } = await validateExistTask(taskId, async ({ completed }) => {
    return TaskModel.completeTask({ taskId, completed: !completed })
  })
  if (error) return { error }
  return getCompactTask(result)
}
