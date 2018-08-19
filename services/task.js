const _ = require('lodash')
const TaskDB = require('../db/task')
const { ERROR_MSG } = require('../utils/error')
const { getCompactTask } = require('../utils/task')

async function validateTask (taskId, callback) {
  const existTask = await TaskDB.findTaskById({ taskId })
  if (_.isEmpty(existTask)) return { error: ERROR_MSG.TASK.NOT_FOUND }

  return { result: await callback }
}

exports.createTask = async ({ ownerId, content }) => {
  const task = await TaskDB.createTask({ ownerId, content })
  return getCompactTask(task)
}

exports.getTasks = async ({ ownerId }) => {
  const tasks = await TaskDB.findTasksByOwnerId({ ownerId })
  return _.map(tasks, getCompactTask)
}

exports.getTaskById = async ({ taskId }) => {
  const task = await TaskDB.findTaskById({ taskId })
  return getCompactTask(task)
}

exports.updateTask = async ({ taskId, content, order }) => {
  const { result, error } = await validateTask(taskId, TaskDB.updateTask({ taskId, content, order }))
  if (error) return { error }
  return getCompactTask(result)
}

exports.deleteTask = async ({ taskId }) => {
  const { result, error } = await validateTask(taskId, TaskDB.deleteTask({ taskId }))
  if (error) return { error }
  return getCompactTask(result)
}

exports.completeTask = async ({ taskId }) => {
  const { result, error } = await validateTask(taskId, TaskDB.completeTask({ taskId }))
  if (error) return { error }
  return getCompactTask(result)
}
